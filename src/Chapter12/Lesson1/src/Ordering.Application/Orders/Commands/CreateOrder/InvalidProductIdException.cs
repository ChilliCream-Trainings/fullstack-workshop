using eShop.Ordering.Domain.Exceptions;

namespace eShop.Ordering.Application.Orders.Commands.CreateOrder;

public sealed class InvalidProductIdException(int productId)
    : OrderingDomainException("The provided product id is invalid.")
{
    public int ProductId { get; } = productId;
}