namespace eShop.Catalog.Services;

public sealed class BrandService(
    CatalogContext context, 
    IBrandByIdDataLoader brandById,
    IBrandByNameDataLoader brandByName)
{
    public async Task<Brand> GetBrandByIdAsync(
        int id, 
        CancellationToken ct = default)
        => await brandById.LoadAsync(id, ct);
    
    public async Task<Brand> GetBrandByNameAsync(
        string name, 
        CancellationToken ct = default)
        => await brandByName.LoadAsync(name, ct);

    public async Task<Page<Brand>> GetBrandsAsync(
        PagingArguments args, 
        CancellationToken ct = default)
        => await context.Brands
            .AsNoTracking()
            .OrderBy(t => t.Name)
            .ThenBy(t => t.Id)
            .ToPageAsync(args, ct);
}