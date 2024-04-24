namespace eShop.Catalog.Services;

public readonly record struct ProductFilter(
    IReadOnlyList<string>? ProductNames, 
    IReadOnlyList<int>? BrandIds, 
    IReadOnlyList<int>? TypeIds);