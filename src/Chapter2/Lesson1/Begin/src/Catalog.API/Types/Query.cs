namespace eShop.Catalog.Types;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Brand> GetBrands(CatalogContext context)
        => context.Brands;
    
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Brand> GetBrandById(int id, CatalogContext context)
        => context.Brands.Where(t => t.Id == id);
}