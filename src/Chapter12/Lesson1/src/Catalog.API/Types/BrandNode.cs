using HotChocolate.Types.Pagination;

namespace eShop.Catalog.Types;

[ExtendObjectType<Brand>]
public static class BrandNode
{
    [BindMember(nameof(brand.Products))]
    [UsePaging]
    public static async Task<Connection<Product>> GetProductsAsync(
        [Parent] Brand brand,
        PagingArguments args,
        ProductService productService,
        CancellationToken ct)
        => await productService
            .GetProductsByBrandAsync(brand.Id, args, ct)
            .ToConnectionAsync();
}