namespace eShop.Basket.Services;

public interface IShoppingBasketService
{
    Task<ShoppingBasket?> GetBasketAsync(string customerId, CancellationToken cancellationToken = default);
    
    Task SaveBasketAsync(ShoppingBasket basket, CancellationToken cancellationToken = default);
    
    Task<bool> DeleteBasketAsync(string customerId, CancellationToken cancellationToken = default);
}