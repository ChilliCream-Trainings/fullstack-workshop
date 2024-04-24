namespace eShop.Ordering.Application.Common.ReadModels;

public sealed class  OrderItem
{
    public required Product Product { get; init; }
    public required int Units { get; init; }
    public required decimal UnitPrice { get; init; }
}