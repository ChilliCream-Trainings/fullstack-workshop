namespace eShop.Catalog.Models;

public sealed class ShoppingBasket(string customerId, List<ShoppingBasketItem> items)
{
    public string CustomerId { get; set; } = customerId;

    public List<ShoppingBasketItem> Items { get; set; } = items;
}
