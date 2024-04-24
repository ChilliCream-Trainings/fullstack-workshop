namespace eShop.Catalog.Types;

public record ProductsFilterInputType(
    ProductsNameFilterInputType? Name,
    ProductsBrandIdFilterInputType? BrandId,
    ProductsTypeIdFilterInputType? TypeId)
{
    public ProductFilter ToFilter()
        => new(Name?.In, BrandId?.In, TypeId?.In);
}

public record ProductsNameFilterInputType(
    string[]? In);

public record ProductsBrandIdFilterInputType(
    [property: ID<Brand>] int[]? In);

public record ProductsTypeIdFilterInputType(
    [property: ID<Type>] int[]? In);
