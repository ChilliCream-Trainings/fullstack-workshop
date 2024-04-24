namespace eShop.IntegrationEvents;

public sealed record OrderStatusChangedToStockConfirmedIntegrationEvent(
    int OrderId,
    OrderStatus OrderStatus,
    string BuyerName,
    string BuyerIdentityGuid)
    : IntegrationEvent;
