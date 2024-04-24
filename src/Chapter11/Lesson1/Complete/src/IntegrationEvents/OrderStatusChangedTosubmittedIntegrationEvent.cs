namespace eShop.IntegrationEvents;

public sealed record OrderStatusChangedToSubmittedIntegrationEvent(
    int OrderId,
    OrderStatus OrderStatus,
    string BuyerName,
    string BuyerIdentityGuid)
    : IntegrationEvent;
