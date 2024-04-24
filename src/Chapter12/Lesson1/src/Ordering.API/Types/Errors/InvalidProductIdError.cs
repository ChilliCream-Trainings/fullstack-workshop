using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Commands.CreateOrder;

namespace eShop.Ordering.Types;

public sealed record InvalidProductIdError : IMutationError
{
    public InvalidProductIdError(int productId)
    {
        ProductId = productId;
    }

    public InvalidProductIdError(InvalidProductIdException exception)
    {
        ProductId = exception.ProductId;
    }

    public string Message => "The provided product id is invalid.";

    [ID<Product>] public int ProductId { get; init; }

    public void Deconstruct(out int productId)
    {
        productId = ProductId;
    }
}
