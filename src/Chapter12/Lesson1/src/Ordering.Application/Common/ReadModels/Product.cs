namespace eShop.Ordering.Application.Common.ReadModels;

public sealed class Product
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required Uri ImageUrl { get; init; }
}