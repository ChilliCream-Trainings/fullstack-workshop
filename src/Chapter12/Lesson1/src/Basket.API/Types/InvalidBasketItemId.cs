namespace eShop.Basket.Types;

public sealed record InvalidBasketItemId(string Id)
{
    public string Message => $"Invalid basket item id: {Id}";
}