using HotChocolate.Types.Pagination;

namespace eShop.Catalog.Types;

[ExtendObjectType<ProductType>]
public static class ProductTypeNode
{
    [BindMember(nameof(productType.Products))]
    [UsePaging]
    public static async Task<Connection<Product>> GetProductsAsync(
        [Parent] ProductType productType,
        PagingArguments args,
        ProductService productService,
        CancellationToken ct)
        => await productService
            .GetProductsByTypeAsync(productType.Id, args, ct)
            .ToConnectionAsync();
}