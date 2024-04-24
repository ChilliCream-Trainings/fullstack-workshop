namespace eShop.Basket.Models;

[ExtendObjectType<ShoppingBasket>]
public static class ShoppingBasketExtensions
{
    [ID]
    [BindMember(nameof(ShoppingBasket.CustomerId))]
    public static string GetId([Parent] ShoppingBasket item)
        => item.CustomerId;
}
