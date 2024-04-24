using HotChocolate.Types.Pagination;

namespace eShop.Catalog.Types;

public static class ProductOperations
{
    [Query]
    [NodeResolver]
    public static Task<Product> GetProductByIdAsync(
        int id,
        ProductService productService,
        CancellationToken ct)
        => productService.GetProductByIdAsync(id, ct);

    [Query]
    [UsePaging]
    public static Task<Connection<Product>> GetProductsAsync(
        ProductsFilterInputType? where,
        PagingArguments args,
        ProductService productService,
        CancellationToken ct)
        => productService.GetProductsAsync(args, where?.ToFilter(), ct).ToConnectionAsync();

    [Mutation]
    [Error<MaxStockThresholdToLowException>]
    [Error<FileExtensionNotAllowedException>]
    public static async Task<Product> CreateProductAsync(
        CreateProductInput input,
        ProductService productService,
        CancellationToken ct)
    {
        var product = new Product
        {
            Name = input.Name,
            Description = input.Description,
            Price = input.Price,
            TypeId = input.TypeId,
            BrandId = input.BrandId,
            RestockThreshold = input.RestockThreshold,
            MaxStockThreshold = input.MaxStockThreshold,
        };

        ProductImage? productImage = null;

        if (input.Image is not null)
        {
            productImage = new ProductImage(input.Image.Name, input.Image.OpenReadStream);
        }

        await productService.CreateProductAsync(product, productImage, ct);

        return product;
    }
}