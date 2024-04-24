using System.ComponentModel.DataAnnotations;
using eShop.Ordering.Domain.Common;
using eShop.Ordering.Domain.Exceptions;

namespace eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

public sealed class OrderItem : Entity
{
    private OrderItem() { }

    public OrderItem(
        int productId,
        string productName,
        decimal unitPrice,
        decimal discount,
        Uri productImageUrl,
        int units = 1)
    {
        if (units <= 0)
        {
            throw new OrderingDomainException("Invalid number of units");
        }

        if (unitPrice * units < discount)
        {
            throw new OrderingDomainException("The total of order item is lower than applied discount");
        }

        ProductId = productId;

        ProductName = productName;
        UnitPrice = unitPrice;
        Discount = discount;
        Units = units;
        ProductImageUrl = productImageUrl;
    }
    
    public int Id { get; private set; }

    public string ProductName { get; private set; }

    public Uri ProductImageUrl { get; private set; }

    public decimal UnitPrice { get; private set; }

    public decimal Discount { get; private set; }

    public int Units { get; private set; }

    public int ProductId { get; private set; }

    public void SetNewDiscount(decimal discount)
    {
        if (discount < 0)
        {
            throw new OrderingDomainException("Discount is not valid");
        }

        Discount = discount;
    }

    public void AddUnits(int units)
    {
        if (units < 0)
        {
            throw new OrderingDomainException("Invalid units");
        }

        Units += units;
    }
}