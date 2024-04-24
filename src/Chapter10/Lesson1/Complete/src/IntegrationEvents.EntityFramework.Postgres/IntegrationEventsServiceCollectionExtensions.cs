using eShop.IntegrationEvents;
using eShop.IntegrationEvents.EntityFramework.Postgres;
using eShop.Ordering.Infrastructure;

namespace Microsoft.Extensions.DependencyInjection;

public static class PostgresIntegrationEventsServiceCollectionExtensions
{
    public static IServiceCollection AddPostgresIntegrationEvents<TContext>(
        this IServiceCollection services)
        where TContext : DbContext
    {
        services.AddScoped<IIntegrationEventPublisher>(
            sp => new IntegrationEventPublisher(sp.GetRequiredService<TContext>()));

        services.AddSingleton<IntegrationEventProcessor>();
        services.AddSingleton<IntegrationEventSignal>();
        services.AddSingleton<IDispatchIntegrationEvenSignal>(
            sp => sp.GetRequiredService<IntegrationEventSignal>());

        services.AddHostedService<IntegrationEventWorker>();

        return services;
    }
}
