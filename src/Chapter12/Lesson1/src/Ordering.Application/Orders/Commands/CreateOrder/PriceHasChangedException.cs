using eShop.Ordering.Domain.Exceptions;

namespace eShop.Ordering.Application.Orders.Commands.CreateOrder;

public sealed class PriceHasChangedException(int productId, decimal newPrice, decimal oldPrice)
    : OrderingDomainException("The price of the product has changed.")
{
    public int ProductId { get; } = productId;
    
    public decimal NewPrice { get; } = newPrice;
    
    public decimal OldPrice { get; } = oldPrice;
}