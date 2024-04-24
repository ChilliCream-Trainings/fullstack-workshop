namespace eShop.Catalog.Types.Filtering;

public readonly record struct ProductsFilterInputType(
    ProductsBrandIdFilterInputType? BrandId,
    ProductsTypeIdFilterInputType? TypeId)
{
    public ProductFilter ToFilter() => new(BrandId?.In, TypeId?.In);
}

public readonly record struct ProductsBrandIdFilterInputType([ID<Brand>] int[]? In);

public readonly record struct ProductsTypeIdFilterInputType([ID<ProductType>] int[]? In);