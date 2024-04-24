namespace eShop.Catalog.Types;

[ExtendObjectType<Product>(
    IgnoreProperties = 
    [
        nameof(Product.RemoveStock), 
        nameof(Product.AddStock),
        nameof(Product.TypeId),
        nameof(Product.BrandId),
    ])]
public static class ProductNode
{
    [BindMember(nameof(product.ImageFileName))]
    public static Uri GetImageUrl([Parent] Product product, HttpContext context)
        => new($"http://{context.Request.Host}/api/products/{product.Id}/img");

    [BindMember(nameof(product.Type))]
    public static Task<ProductType> GetTypeAsync(
        [Parent] Product product,
        ProductService productService,
        CancellationToken ct)
        => productService.GetProductTypeByIdAsync(product.TypeId, ct);

    [BindMember(nameof(product.Brand))]
    public static Task<Brand> GetBrandAsync(
        [Parent] Product product,
        BrandService brandService,
        CancellationToken ct)
        => brandService.GetBrandByIdAsync(product.BrandId, ct);
}
