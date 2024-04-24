namespace eShop.Basket.Models;

[ExtendObjectType<ShoppingBasketItem>]
public static class ShoppingBasketItemExtensions
{
    [BindMember(nameof(ShoppingBasketItem.ProductId))]
    public static Product GetProduct([Parent] ShoppingBasketItem item)
        => new(item.ProductId);
}