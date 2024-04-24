namespace eShop.IntegrationEvents;

public sealed record OrderStatusChangedToPaidIntegrationEvent(
    int OrderId,
    OrderStatus OrderStatus,
    string BuyerName,
    string BuyerIdentityGuid,
    IEnumerable<OrderStockItem> OrderStockItems)
    : IntegrationEvent;

