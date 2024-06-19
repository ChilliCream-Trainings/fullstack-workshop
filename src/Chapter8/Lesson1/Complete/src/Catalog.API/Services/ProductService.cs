namespace eShop.Catalog.Services;

public sealed class ProductService(
    CatalogContext context, 
    IProductByIdDataLoader productById,
    IProductsByBrandIdDataLoader productsByBrandId,
    IProductsByTypeIdDataLoader productsByTypeId)
{
    public async Task<Product?> GetProductByIdAsync(int id, CancellationToken cancellationToken = default)
        => await productById.LoadAsync(id, cancellationToken);
    
    public async Task<Page<Product>> GetProductsAsync(
        ProductFilter? productFilter,
        PagingArguments pagingArguments,  
        CancellationToken cancellationToken = default)
    {
        var query = context.Products.AsNoTracking();

        if (productFilter?.BrandIds is { Count: > 0 } brandIds)
        {
            query = query.Where(p => brandIds.Contains(p.BrandId));
        }
        
        if (productFilter?.TypeIds is { Count: > 0 } typeIds)
        {
            query = query.Where(p => typeIds.Contains(p.TypeId));
        }
        
        return await query.OrderBy(t => t.Name).ThenBy(t => t.Id).ToPageAsync(pagingArguments, cancellationToken);
    }

    public async Task<Page<Product>> GetProductsByBrandAsync(
        int brandId,
        PagingArguments args,
        CancellationToken ct = default)
        => await productsByBrandId.LoadAsync(new PageKey<int>(brandId, args), ct);

    public async Task<Page<Product>> GetProductsByTypeAsync(
        int typeId,
        PagingArguments args,
        CancellationToken ct = default)
        => await productsByTypeId.LoadAsync(new PageKey<int>(typeId, args), ct);
    
    public async Task CreateProductAsync(Product product, CancellationToken cancellationToken)
    {
        if (product.RestockThreshold < product.MaxStockThreshold)
        {
            throw new InvalidRestockThresholdException();
        }

        if (product.Price < 1)
        {
            throw new InvalidPriceException();
        }
        
        if(!await context.Brands.AnyAsync(t => t.Id == product.BrandId, cancellationToken))
        {
            throw new InvalidEntityReferenceException("Brand");
        }
        
        if(!await context.ProductTypes.AnyAsync(t => t.Id == product.TypeId, cancellationToken))
        {
            throw new InvalidEntityReferenceException("ProductType");
        }
        
        context.Products.Add(product);
        await context.SaveChangesAsync(cancellationToken);
    }
}

public class InvalidRestockThresholdException : Exception
{
    public InvalidRestockThresholdException()
        : base("Restock threshold must be less than max stock threshold.")
    {
    }
}

public class InvalidPriceException : Exception
{
    public InvalidPriceException()
        : base("Price must be greater than 0.")
    {
    }
}

public class InvalidEntityReferenceException : Exception
{
    public InvalidEntityReferenceException(string entityName)
        : base($"The provided {entityName} does not exist.")
    {
    }
    
    public string EntityName { get; set; }
}