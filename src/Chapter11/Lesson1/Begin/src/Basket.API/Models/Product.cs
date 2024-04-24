namespace eShop.Basket.Models;

public sealed class Product(int id)
{
    [ID<Product>]
    public int Id { get; } = id;

    // public string Name { get; set; } = default!;

    // public Uri ImageUrl { get; set; } = default!;
}