using HotChocolate.Types.Pagination;

namespace eShop.Catalog.Types;

public static class BrandOperations
{
    [Query]
    [NodeResolver]
    public static async Task<Brand> GetBrandByIdAsync(
        int id,
        BrandService brandService,
        CancellationToken ct)
        => await brandService.GetBrandByIdAsync(id, ct);
    
    [Query]
    public static async Task<Brand> GetBrandByNameAsync(
        string name,
        BrandService brandService,
        CancellationToken ct)
        => await brandService.GetBrandByNameAsync(name, ct);

    [Query]
    [UsePaging]
    public static async Task<Connection<Brand>> GetBrandsAsync(
        PagingArguments args,
        BrandService brandService,
        CancellationToken ct)
        => await brandService.GetBrandsAsync(args, ct).ToConnectionAsync();
    
    [Mutation]
    public static async Task<Brand> CreateBrand(
        string name,
        BrandService brandService,
        CancellationToken ct)
    {
        var brand = new Brand { Name = name, };
        await brandService.CreateBrandAsync(brand, ct);
        return brand;
    }
    
    [Mutation]
    [Error<BrandNotFoundError>]
    public static async Task<Brand> RenameBrand(
        int id,
        string name,
        BrandService brandService,
        CancellationToken ct)
        => await brandService.RenameBrandAsync(id, name, ct);

    [Mutation]
    [UseMutationConvention(PayloadFieldName = "deletedBrandId")]
    [Error<BrandNotFoundError>]
    public static async Task<int> DeleteBrand(
        int id,
        BrandService brandService,
        CancellationToken ct)
    {
        await brandService.DeleteBrandAsync(id, ct);
        return id;
    }
}