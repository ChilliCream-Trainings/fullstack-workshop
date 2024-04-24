namespace eShop.IntegrationEvents;

public sealed record OrderStatusChangedToAwaitingValidationIntegrationEvent(
    int OrderId,
    OrderStatus OrderStatus,
    string BuyerName,
    string BuyerIdentityGuid,
    IEnumerable<OrderStockItem> OrderStockItems)
    : IntegrationEvent;

public record OrderStockItem(int ProductId, int Units);

public enum OrderStatus
{
    Submitted = 1,
    AwaitingValidation = 2,
    StockConfirmed = 3,
    Paid = 4,
    Shipped = 5,
    Cancelled = 6
}
