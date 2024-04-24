namespace eShop.IntegrationEvents;

public sealed record OrderPaymentFailedIntegrationEvent(int OrderId) : IntegrationEvent;
