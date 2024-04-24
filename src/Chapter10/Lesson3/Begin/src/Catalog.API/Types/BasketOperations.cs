using eShop.Basket.Services;
using eShop.Basket.Types;
using eShop.SessionManagement;

namespace eShop.Catalog.Types;

public static class BasketOperations
{
    private static readonly Viewer _viewer = new();

    [Query]
    public static Viewer Viewer() => _viewer;

    [Mutation]
    public static async Task<FieldResult<ShoppingBasket, QuantityCannotBeNegativeError>> AddToBasketAsync(
        [ID<Product>] int productId,
        int quantity,
        UserInfo userInfo,
        IShoppingBasketService basketService,
        CancellationToken ct)
    {
        if (quantity <= 0)
        {
            return new QuantityCannotBeNegativeError(quantity);
        }

        var basket = await basketService.GetBasketAsync(userInfo.Id, ct);
        basket ??= new ShoppingBasket(userInfo.Id, []);
        basket.Items.Add(new ShoppingBasketItem(productId, quantity));
        await basketService.SaveBasketAsync(basket, ct);
        return basket;
    }

    [Mutation]
    public static async Task<FieldResult<ShoppingBasket, QuantityCannotBeNegativeError, InvalidBasketItemId>> ChangeQuantityAsync(
        string id,
        int quantity,
        UserInfo userInfo,
        IShoppingBasketService basketService,
        CancellationToken ct)
    {
        if (quantity < 0)
        {
            return new QuantityCannotBeNegativeError(quantity);
        }

        var basket = await basketService.GetBasketAsync(userInfo.Id, ct);
        if (basket is null)
        {
            return new InvalidBasketItemId(id);
        }

        var item = basket.Items.FirstOrDefault(i => i.Id == id);
        if (item is null)
        {
            return new InvalidBasketItemId(id);
        }

        if (quantity == 0)
        {
            basket.Items.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
            await basketService.SaveBasketAsync(basket, ct);
        }

        return basket;
    }

    [Mutation]
    public static async Task<FieldResult<ShoppingBasket, InvalidBasketItemId>> RemoveFromBasketAsync(
        string id,
        UserInfo userInfo,
        IShoppingBasketService basketService,
        CancellationToken ct)
    {
        var basket = await basketService.GetBasketAsync(userInfo.Id, ct);
        if (basket is null)
        {
            return new InvalidBasketItemId(id);
        }

        var item = basket.Items.FirstOrDefault(i => i.Id == id);
        if (item is null)
        {
            return new InvalidBasketItemId(id);
        }

        basket.Items.Remove(item);
        await basketService.SaveBasketAsync(basket, ct);
        return basket;
    }

    [Mutation]
    [UseMutationConvention(PayloadFieldName = "deleted")]
    public static async Task<bool> ClearBasketAsync(
        UserInfo userInfo,
        IShoppingBasketService basketService,
        CancellationToken ct)
    {
        var deleted = await basketService.DeleteBasketAsync(userInfo.Id, ct);
        return deleted;
    }
}
