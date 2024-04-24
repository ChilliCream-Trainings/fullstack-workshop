namespace eShop.Catalog.Types.Filtering;

public readonly record struct ProductsFilterInputType(
    ProductsBrandIdFilterInputType? BrandId,
    ProductsTypeIdFilterInputType? TypeId)
{
    public ProductFilter ToFilter() => new(BrandId?.In, TypeId?.In);
}

public readonly record struct ProductsBrandIdFilterInputType([property: ID<Brand>] int[]? In);

public readonly record struct ProductsTypeIdFilterInputType([property: ID<ProductType>] int[]? In);