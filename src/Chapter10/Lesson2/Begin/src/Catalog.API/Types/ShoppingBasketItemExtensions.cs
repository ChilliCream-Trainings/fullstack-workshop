namespace eShop.Catalog.Types;

[ExtendObjectType<ShoppingBasketItem>]
public static class ShoppingBasketItemExtensions
{
    [BindMember(nameof(ShoppingBasketItem.ProductId))]
    public static async Task<Product> GetProduct(
        [Parent] ShoppingBasketItem item,
        IProductByIdDataLoader productById,
        CancellationToken cancellationToken)
        => await productById.LoadAsync(item.ProductId, cancellationToken);
}