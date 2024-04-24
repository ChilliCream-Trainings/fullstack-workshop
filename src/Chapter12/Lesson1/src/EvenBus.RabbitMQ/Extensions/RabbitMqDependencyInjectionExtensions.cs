using eShop.EventBus.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;

namespace eShop.EventBus;

public static class RabbitMqDependencyInjectionExtensions
{
    private const string SectionName = "EventBus";

    public static IEventBusBuilder AddRabbitMQEventBus(
        this IHostApplicationBuilder builder,
        string connectionName)
    {
        ArgumentNullException.ThrowIfNull(builder);

        builder.AddRabbitMQClient(
            connectionName,
            configureConnectionFactory: factory =>
            {
                factory.DispatchConsumersAsync = true;
            });

        builder.Services
            .AddOpenTelemetry()
            .WithTracing(tracing => tracing.AddSource(RabbitMQTelemetry.ActivitySourceName));

        builder.Services
            .AddOptions<EventBusOptions>()
            .Bind(builder.Configuration.GetSection(SectionName));

        builder.Services.AddSingleton<IEventBus, RabbitMQEventBus>();
        builder.Services.AddHostedService<MessagingProcessingWorker>();

        return new EventBusBuilder(builder.Services);
    }

    private class EventBusBuilder(IServiceCollection services) : IEventBusBuilder
    {
        public IServiceCollection Services => services;
    }
}
