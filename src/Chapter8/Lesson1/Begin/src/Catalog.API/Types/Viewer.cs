using eShop.Basket.Services;
using eShop.SessionManagement;

namespace eShop.Basket.Types;

public sealed class Viewer
{
    public string? GetUsername(UserInfo? user)
        => user?.Name;

    public async Task<ShoppingBasket?> GetBasketAsync(
        IShoppingBasketService shoppingBasketService,
        UserInfo? user)
        => user is not null ? await shoppingBasketService.GetBasketAsync(user.Id) : null;
}
