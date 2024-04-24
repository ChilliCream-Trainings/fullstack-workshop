namespace eShop.Catalog.Services;

public sealed class BrandService(
    CatalogContext context, 
    IBrandByIdDataLoader brandById,
    IBrandByNameDataLoader brandByName)
{
    public async Task<Brand> GetBrandByIdAsync(int id, CancellationToken ct = default)
        => await brandById.LoadAsync(id, ct);
    
    public async Task<Brand> GetBrandByNameAsync(string name, CancellationToken ct = default)
        => await brandByName.LoadAsync(name, ct);

    public async Task<Page<Brand>> GetBrandsAsync(PagingArguments args, CancellationToken ct = default)
        => await context.Brands.AsNoTracking().OrderBy(t => t.Name).ThenBy(t => t.Id).ToPageAsync(args, ct);
    
    public async Task CreateBrandAsync(Brand brand, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(brand);
        context.Brands.Add(brand);
        await context.SaveChangesAsync(ct);
    }
    
    public async Task<Brand> RenameBrandAsync(int id, string name, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(name);
        var brand = await context.Brands.FindAsync([id,], ct);

        if (brand is null)
        {
            throw new EntityNotFoundException(id);
        }
        
        brand.Name = name;
        await context.SaveChangesAsync(ct);
        return brand;
    }
    
    public async Task DeleteBrandAsync(int id, CancellationToken ct = default)
    {
        var brand = await context.Brands.FindAsync([id,], ct);
        if (brand is null)
        {
            throw new EntityNotFoundException(id);
        }
        
        context.Brands.Remove(brand);
        await context.SaveChangesAsync(ct);
    }
}