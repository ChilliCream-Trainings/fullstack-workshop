namespace eShop.Ordering.Application.Common.ReadModels;

public record DraftOrder
{
    public IReadOnlyList<OrderItem>? OrderItems { get; init; }
    public decimal Total { get; init; }
}