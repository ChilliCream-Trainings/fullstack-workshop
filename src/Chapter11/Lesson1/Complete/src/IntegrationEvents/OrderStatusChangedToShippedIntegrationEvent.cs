namespace eShop.IntegrationEvents;

public sealed record OrderStatusChangedToShippedIntegrationEvent(
    int OrderId,
    OrderStatus OrderStatus,
    string BuyerName,
    string BuyerIdentityGuid)
    : IntegrationEvent;
