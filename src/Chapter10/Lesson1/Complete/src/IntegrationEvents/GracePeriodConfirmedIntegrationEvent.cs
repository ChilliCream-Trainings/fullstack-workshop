namespace eShop.IntegrationEvents;

public sealed record GracePeriodConfirmedIntegrationEvent(int OrderId) : IntegrationEvent;

