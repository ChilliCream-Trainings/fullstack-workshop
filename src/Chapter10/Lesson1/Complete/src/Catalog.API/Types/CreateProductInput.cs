using System.ComponentModel.DataAnnotations;

namespace eShop.Catalog.Types;

public sealed record CreateProductInput(
    [property: MaxLength(100)] 
    string Name,

    string? Description,

    [property: Range(0, double.MaxValue)] 
    decimal Price,
    
    IFile? Image,

    [property: Range(0, int.MaxValue)]
    [property: ID<ProductType>]
    int TypeId,

    [property: Range(0, int.MaxValue)]
    [property: ID<Brand>]
    int BrandId,

    [property: Range(0, int.MaxValue)] 
    int RestockThreshold,

    [property: Range(0, int.MaxValue)] 
    int MaxStockThreshold
);