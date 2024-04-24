namespace eShop.Ordering.Application.Orders.Contracts;

public record ProductInfo
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required Uri ImageUrl { get; init; }
    public required decimal Price { get; init; }
}