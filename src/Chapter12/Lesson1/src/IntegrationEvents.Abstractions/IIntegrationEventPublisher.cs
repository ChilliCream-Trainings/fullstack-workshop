namespace eShop.IntegrationEvents;

public interface IIntegrationEventPublisher
{
    Task PublishAsync<T>(T integrationEvent, CancellationToken cancellationToken = default) 
        where T : IntegrationEvent;
    
    Task PublishAsync<T>(ReadOnlyMemory<T> integrationEvents, CancellationToken cancellationToken = default) 
        where T : IntegrationEvent;
}
