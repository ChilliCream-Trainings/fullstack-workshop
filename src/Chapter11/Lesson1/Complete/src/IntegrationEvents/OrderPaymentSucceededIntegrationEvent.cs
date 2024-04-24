namespace eShop.IntegrationEvents;

public sealed record OrderPaymentSucceededIntegrationEvent(int OrderId) : IntegrationEvent;
