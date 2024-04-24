namespace eShop.IntegrationEvents;

public sealed record OrderStockConfirmedIntegrationEvent(int OrderId) : IntegrationEvent;
