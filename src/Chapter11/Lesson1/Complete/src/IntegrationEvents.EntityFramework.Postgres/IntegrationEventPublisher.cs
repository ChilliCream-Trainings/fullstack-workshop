using eShop.IntegrationEvents;
using eShop.IntegrationEvents.EntityFramework.Postgres;

namespace eShop.Ordering.Infrastructure;

internal sealed class IntegrationEventPublisher(DbContext orderingContext)
    : IIntegrationEventPublisher
{
    /// <inheritdoc />
    public async Task PublishAsync<T>(
        T integrationEvent,
        CancellationToken cancellationToken = default)
        where T : IntegrationEvent
        => await orderingContext.PublishEventAsync(integrationEvent, cancellationToken);

    /// <inheritdoc />
    public async Task PublishAsync<T>(
        ReadOnlyMemory<T> integrationEvents,
        CancellationToken cancellationToken = default)
        where T : IntegrationEvent
        => await orderingContext.PublishEventsAsync(integrationEvents, cancellationToken);
}
