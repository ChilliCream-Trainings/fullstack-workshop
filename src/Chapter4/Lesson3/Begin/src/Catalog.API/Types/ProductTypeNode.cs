namespace eShop.Catalog.Types;

[ObjectType<ProductType>]
public static partial class ProductTypeNode
{
    public static IReadOnlyList<Product?> GetProductsAsync(
        [Parent] ProductType productType,
        ProductService productService,
        CancellationToken cancellationToken)
        => Array.Empty<Product>();
}