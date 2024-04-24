namespace eShop.IntegrationEvents;

public sealed record OrderStatusChangedToCancelledIntegrationEvent(
    int OrderId,
    OrderStatus OrderStatus,
    string BuyerName,
    string BuyerIdentityGuid)
    : IntegrationEvent;
