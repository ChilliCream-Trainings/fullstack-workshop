using System.Collections.Frozen;
using System.Diagnostics;
using System.Text.Json;
using eShop.EventBus.Abstractions;
using eShop.IntegrationEvents;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OpenTelemetry.Trace;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace eShop.EventBus;

internal sealed class MessagingProcessingWorker(
    IConnection connection,
    ILogger<RabbitMQEventBus> logger,
    IServiceProvider serviceProvider,
    IOptions<EventBusOptions> options,
    IOptions<EventBusSubscriptionInfo> subscriptionOptions)
    : IDisposable, IHostedService
{
    private const string ExchangeName = "eshop_event_bus";
    private readonly FrozenDictionary<string, Type> _eventTypes =
        subscriptionOptions.Value.EventTypes.ToFrozenDictionary();
    private readonly JsonSerializerOptions _serializerOptions =
        subscriptionOptions.Value.JsonSerializerOptions;
    private readonly string _queueName = options.Value.SubscriptionClientName;

    private IModel? _consumerChannel;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        // Messaging is async so we don't need to wait for it to complete. On top of this
        // the APIs are blocking, so we need to run this on a background thread.
        _ = SetupMessaging();

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _consumerChannel?.Dispose();
    }

    private async Task SetupMessaging()
    {
        await Task.Yield();

        using var activity = RabbitMQTelemetry.ActivitySource.StartActivity();

        try
        {
            logger.StartingRabbitMQConnection();

            if (!connection.IsOpen)
            {
                return;
            }

            logger.CreatingRabbitMQConsumerChannel();

            _consumerChannel = connection.CreateModel();
            _consumerChannel.CallbackException += OnConsumerChannelOnCallbackException;
            _consumerChannel.ExchangeDeclare(exchange: ExchangeName, type: "direct");
            _consumerChannel
                .QueueDeclare(_queueName, durable: true, exclusive: false, autoDelete: false);

            logger.StartingRabbitMQConnection();

            var consumer = new AsyncEventingBasicConsumer(_consumerChannel);
            consumer.Received += OnMessageReceived;
            _consumerChannel.BasicConsume(queue: _queueName, autoAck: false, consumer: consumer);

            foreach (var (eventName, _) in _eventTypes)
            {
                _consumerChannel.QueueBind(_queueName, ExchangeName, eventName);
            }
        }
        catch (Exception ex)
        {
            Activity.Current?.RecordException(ex);
            logger.CouldNotStartRabbitMQConnection();
        }
    }

    private async Task OnMessageReceived(object sender, BasicDeliverEventArgs eventArgs)
    {
        using var activity = RabbitMQTelemetry.ActivitySource.StartReceivingActivity(eventArgs);

        var eventName = eventArgs.RoutingKey;
        var message = eventArgs.Body;

        try
        {
            await ProcessEvent(eventName, message);
        }
        catch (Exception ex)
        {
            logger.CouldNotProcessMessageOfType(eventName);
            activity?.RecordException(ex);
            activity?.SetStatus(Status.Error);
        }

        // Even on exception we take the message off the queue.
        // in a REAL WORLD app this should be handled with a Dead Letter Exchange (DLX). 
        // For more information see: https://www.rabbitmq.com/dlx.html
        _consumerChannel?.BasicAck(eventArgs.DeliveryTag, multiple: false);
    }

    private async Task ProcessEvent(string eventName, ReadOnlyMemory<byte> message)
    {
        logger.ProcessingRabbitMQEvent(eventName);

        await using var scope = serviceProvider.CreateAsyncScope();

        if (!_eventTypes.TryGetValue(eventName, out var eventType))
        {
            logger.UnableToResolveEventTypeForEventName(eventName);
            return;
        }

        var integrationEvent =
            MessageSerializer.DeserializeMessage(message, eventType, _serializerOptions);

        if (integrationEvent is null)
        {
            return;
        }

        var handlers = scope.ServiceProvider.GetKeyedServices<IIntegrationEventHandler>(eventType);
        foreach (var handler in handlers)
        {
            await handler.Handle(integrationEvent);
        }
    }

    private void OnConsumerChannelOnCallbackException(object? _, CallbackExceptionEventArgs ea)
    {
        Activity.Current?.RecordException(ea.Exception);
        logger.ErrorWithRabbitMQConsumerChannel(ea.Exception);
    }
}

internal static partial class Logs
{
    [LoggerMessage(LogLevel.Warning, "Could not process message of type {EventName}")]
    public static partial void CouldNotProcessMessageOfType(this ILogger logger, string eventName);

    [LoggerMessage(LogLevel.Trace, "Processing RabbitMQ event: {EventName}")]
    public static partial void ProcessingRabbitMQEvent(this ILogger logger, string eventName);

    [LoggerMessage(LogLevel.Warning, "Unable to resolve event type for event name {EventName}")]
    public static partial void UnableToResolveEventTypeForEventName(
        this ILogger logger,
        string eventName);

    [LoggerMessage(LogLevel.Error, "Could not start RabbitMQ connection")]
    public static partial void CouldNotStartRabbitMQConnection(this ILogger logger);

    [LoggerMessage(LogLevel.Information, "Starting RabbitMQ connection on a background thread")]
    public static partial void StartingRabbitMQConnection(this ILogger logger);

    [LoggerMessage(LogLevel.Trace, "Creating RabbitMQ consumer channel")]
    public static partial void CreatingRabbitMQConsumerChannel(this ILogger logger);

    [LoggerMessage(LogLevel.Warning, "Error with RabbitMQ consumer channel")]
    public static partial void ErrorWithRabbitMQConsumerChannel(this ILogger logger, Exception ex);

    [LoggerMessage(LogLevel.Trace, "Starting RabbitMQ basic consume")]
    public static partial void StartingRabbitMQBasicConsume(this ILogger logger);
}
