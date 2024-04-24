namespace eShop.IntegrationEvents;

public sealed record OrderStockRejectedIntegrationEvent(
    int OrderId,
    List<ConfirmedOrderStockItem> OrderStockItems)
    : IntegrationEvent;

public sealed record ConfirmedOrderStockItem(int ProductId, bool HasStock);
