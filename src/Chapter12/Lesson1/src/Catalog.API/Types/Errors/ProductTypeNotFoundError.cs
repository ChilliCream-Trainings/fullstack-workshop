namespace eShop.Catalog.Types.Errors;

public sealed class ProductTypeNotFoundError(EntityNotFoundException exception)
{
    public string Message { get; } = $"A product type with the id `{exception.EntityId}` was not found.";

    [ID<ProductType>] 
    public int ProductTypeId { get; } = exception.EntityId;
}

public sealed class BrandNotFoundError(EntityNotFoundException exception)
{
    public string Message { get; } = $"A brand with the id `{exception.EntityId}` was not found.";

    [ID<ProductType>] 
    public int ProductTypeId { get; } = exception.EntityId;
}