namespace eShop.IntegrationEvents;

public interface IIntegrationEventHandler
{
    Task Handle(IntegrationEvent integrationEvent);
}

public interface IIntegrationEventHandler<in TIntegrationEvent>
    : IIntegrationEventHandler
    where TIntegrationEvent : IntegrationEvent
{
    Task Handle(TIntegrationEvent integrationEvent);

    Task IIntegrationEventHandler.Handle(IntegrationEvent integrationEvent)
        => Handle((TIntegrationEvent) integrationEvent);
}
