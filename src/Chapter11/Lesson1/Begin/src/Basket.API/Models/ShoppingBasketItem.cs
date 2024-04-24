using System.Text.Json.Serialization;

namespace eShop.Basket.Models;

public sealed class ShoppingBasketItem
{
    public ShoppingBasketItem(int productId, int quantity)
        : this(Guid.NewGuid().ToString("N"), productId, quantity)
    {
    }

    [JsonConstructor]
    public ShoppingBasketItem(string id, int productId, int quantity)
    {
        Id = id;
        ProductId = productId;
        Quantity = quantity;
    }

    public int ProductId { get; set; }

    public string Id { get; }

    // public decimal UnitPrice { get; set; }

    // public decimal OldUnitPrice { get; set; }

    public int Quantity { get; set; }
}