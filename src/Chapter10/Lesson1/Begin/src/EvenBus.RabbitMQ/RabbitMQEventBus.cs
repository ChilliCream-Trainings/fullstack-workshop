using System.Net.Sockets;
using System.Text.Json;
using eShop.EventBus.Abstractions;
using eShop.IntegrationEvents;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OpenTelemetry.Trace;
using Polly;
using Polly.Retry;
using RabbitMQ.Client;
using RabbitMQ.Client.Exceptions;

namespace eShop.EventBus;

internal sealed class RabbitMQEventBus(
    IConnection connection,
    ILogger<RabbitMQEventBus> logger,
    IOptions<EventBusOptions> options,
    IOptions<EventBusSubscriptionInfo> subscriptionOptions)
    : IEventBus
{
    private const string ExchangeName = "eshop_event_bus";

    private readonly JsonSerializerOptions _serializerOptions =
        subscriptionOptions.Value.JsonSerializerOptions;

    private readonly AsyncRetryPolicy _policy = Policy
        .Handle<BrokerUnreachableException>()
        .Or<SocketException>()
        .WaitAndRetryAsync(options.Value.RetryCount,
            retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

    public Task PublishAsync(IntegrationEvent @event, CancellationToken cancellationToken)
    {
        var routingKey = @event.GetType().Name;

        logger.CreateingRabbitMQChannelToPublishEvent(@event.Id, routingKey);

        using var channel = connection.CreateModel() ??
            throw new InvalidOperationException("RabbitMQ connection is not open");

        logger.DeclaringRabbitMQExchangeToPublishEvent(@event.Id);

        channel.ExchangeDeclare(exchange: ExchangeName, type: "direct");

        using var buffer = new ArrayWriter();
        MessageSerializer.SerializeMessage(buffer, @event, _serializerOptions);

        // ReSharper disable AccessToDisposedClosure
        return _policy.ExecuteAsync(PublishMessage, cancellationToken);

        Task PublishMessage(CancellationToken _)
        {
            var properties = channel.CreateBasicProperties();

            using var activity =
                RabbitMQTelemetry.ActivitySource.StartPublishingActivity(properties, routingKey);

            logger.PublishingEventToRabbitMQ(@event.Id);

            try
            {
                channel.BasicPublish(exchange: ExchangeName,
                    routingKey: routingKey,
                    mandatory: true,
                    basicProperties: properties,
                    body: buffer.GetWrittenMemory());

                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                logger.ErrorPublishingEventToRabbitMQ(@event.Id, ex);
                activity?.RecordException(ex);
                activity?.SetStatus(Status.Error);

                throw;
            }
        }
        // ReSharper restore AccessToDisposedClosure
    }
}

internal static partial class Logs
{
    [LoggerMessage(
        Level = LogLevel.Trace,
        Message = "Creating RabbitMQ channel to publish event: {eventId} ({eventName})")]
    public static partial void CreateingRabbitMQChannelToPublishEvent(
        this ILogger<RabbitMQEventBus> logger,
        Guid eventId,
        string eventName);

    [LoggerMessage(
        Level = LogLevel.Trace,
        Message = "Declaring RabbitMQ exchange to publish event: {eventId}")]
    public static partial void DeclaringRabbitMQExchangeToPublishEvent(
        this ILogger<RabbitMQEventBus> logger,
        Guid eventId);

    [LoggerMessage(
        Level = LogLevel.Trace,
        Message = "Publishing event to RabbitMQ: {eventId}")]
    public static partial void PublishingEventToRabbitMQ(
        this ILogger<RabbitMQEventBus> logger,
        Guid eventId);

    [LoggerMessage(
        Level = LogLevel.Error,
        Message = "Error publishing event to RabbitMQ: {eventId}")]
    public static partial void ErrorPublishingEventToRabbitMQ(
        this ILogger<RabbitMQEventBus> logger,
        Guid eventId,
        Exception ex);
}
