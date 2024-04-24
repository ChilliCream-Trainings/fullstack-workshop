namespace eShop.Catalog.Services;

public sealed class ProductService(
    CatalogContext context,
    ImageStorage imageStorage,
    IProductByIdDataLoader productById,
    IProductTypeByIdDataLoader productTypeById,
    IProductTypeByNameDataLoader productTypeByName,
    IProductsByBrandIdDataLoader productsByBrandId,
    IProductsByTypeIdDataLoader productsByTypeId)
{
    public async Task<Product> GetProductByIdAsync(int id, CancellationToken ct = default)
        => await productById.LoadAsync(id, ct);

    public async Task<ProductType> GetProductTypeByIdAsync(int id, CancellationToken ct = default)
        => await productTypeById.LoadAsync(id, ct);

    public async Task<ProductType> GetProductTypeByNameAsync(string name, CancellationToken ct = default)
        => await productTypeByName.LoadAsync(name, ct);

    public async Task<Page<Product>> GetProductsAsync(
        PagingArguments args,
        ProductFilter? filter,
        CancellationToken ct = default)
    {
        var query = context.Products.AsNoTracking();

        if (filter?.ProductNames is { Count: > 0, } productNames)
        {
            query = query.Where(t => productNames.Any(n => t.Name.StartsWith(n)));
        }

        if (filter?.BrandIds is { Count: > 0, } brandIds)
        {
            query = query.Where(t => brandIds.Contains(t.BrandId));
        }

        if (filter?.TypeIds is { Count: > 0, } typeIds)
        {
            query = query.Where(t => typeIds.Contains(t.BrandId));
        }

        return await query.OrderBy(t => t.Name).ThenBy(t => t.Id).ToPageAsync(args, ct);
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

    public async Task<Page<ProductType>> GetProductTypesAsync(
        PagingArguments args,
        CancellationToken ct = default)
        => await context.ProductTypes.AsNoTracking().OrderBy(t => t.Name).ThenBy(t => t.Id).ToPageAsync(args, ct);

    public async Task CreateProductAsync(Product product, ProductImage? productImage, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(product);

        if (product.RestockThreshold > 0 && product.RestockThreshold >= product.MaxStockThreshold)
        {
            throw new MaxStockThresholdToLowException(product.RestockThreshold + 1);
        }

        if (productImage is not null)
        {
            await using var stream = productImage.OpenStream();
            product.ImageFileName = await imageStorage.SaveImageAsync(productImage.Name, stream, ct);
        }

        context.Products.Add(product);
        await context.SaveChangesAsync(ct);
    }

    public async Task CreateProductTypeAsync(ProductType productType, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(productType);
        context.ProductTypes.Add(productType);
        await context.SaveChangesAsync(ct);
    }

    public async Task<ProductType> RenameProductTypeAsync(int id, string name, CancellationToken ct = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(name);

        var productType = await context.ProductTypes.FindAsync([id,], ct);

        if (productType is null)
        {
            throw new EntityNotFoundException(id);
        }

        productType.Name = name;
        context.ProductTypes.Add(productType);
        await context.SaveChangesAsync(ct);

        return productType;
    }

    public async Task DeleteProductTypeAsync(int id, CancellationToken ct = default)
    {
        var productType = await context.ProductTypes.FindAsync([id,], ct);

        if (productType is null)
        {
            throw new EntityNotFoundException(id);
        }

        context.ProductTypes.Remove(productType);
        await context.SaveChangesAsync(ct);
    }
}