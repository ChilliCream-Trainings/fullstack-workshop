using HotChocolate.Types.Pagination;

namespace eShop.Catalog.Types;

public static class ProductTypeOperations
{
    [Query]
    [NodeResolver]
    public static async Task<ProductType> GetProductTypeByIdAsync(
        int id,
        ProductService productService,
        CancellationToken ct)
        => await productService.GetProductTypeByIdAsync(id, ct);
    
    [Query]
    public static async Task<ProductType> GetProductTypeByNameAsync(
        string name,
        ProductService productService,
        CancellationToken ct)
        => await productService.GetProductTypeByNameAsync(name, ct);

    [Query]
    [UsePaging]
    public static async Task<Connection<ProductType>> GetProductTypesAsync(
        PagingArguments args,
        ProductService productService,
        CancellationToken ct)
        => await productService.GetProductTypesAsync(args, ct).ToConnectionAsync();

    [Mutation]
    public static async Task<ProductType> CreateProductType(
        string name,
        ProductService productService,
        CancellationToken ct)
    {
        var type = new ProductType { Name = name, };
        await productService.CreateProductTypeAsync(type, ct);
        return type;
    }
    
    [Mutation]
    [Error<ProductTypeNotFoundError>]
    public static async Task<ProductType> RenameProductType(
        [ID<ProductType>] int id,
        string name,
        ProductService productService,
        CancellationToken ct)
        => await productService.RenameProductTypeAsync(id, name, ct);
    
    [Mutation]
    [UseMutationConvention(PayloadFieldName = "deletedProductTypeId")]
    [Error<ProductTypeNotFoundError>]
    public static async Task<int> DeleteProductTypeAsync(
        int id,
        ProductService productService,
        CancellationToken ct)
    {
        await productService.DeleteProductTypeAsync(id, ct);
        return id;
    }
}