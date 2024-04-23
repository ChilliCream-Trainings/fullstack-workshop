using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;

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

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts(CatalogContext context)
        => context.Products;

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<Product> GetProductById(int id, CatalogContext context)
        => context.Products.Where(t => t.Id == id);
    
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<ProductType> GetProductTypes(CatalogContext context)
        => context.ProductTypes;
    
    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<ProductType> GetProductTypeById(int id, CatalogContext context)
        => context.ProductTypes.Where(t => t.Id == id);
}