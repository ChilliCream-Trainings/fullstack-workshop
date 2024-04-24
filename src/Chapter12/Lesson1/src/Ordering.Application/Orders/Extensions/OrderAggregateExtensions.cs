using eShop.Ordering.Application.Common.ReadModels;

namespace eShop.Ordering.Application.Orders.Extensions;

public static class OrderAggregateExtensions
{
    public static OrderItem ToOrderItemReadModel(this Domain.AggregatesModels.OrderAggregate.OrderItem orderItem)
    {
        return new OrderItem
        {
            Product = orderItem.ToProductReadModel(),
            Units = orderItem.Units,
            UnitPrice = orderItem.UnitPrice,
        };
    }
    
    public static Product ToProductReadModel(this Domain.AggregatesModels.OrderAggregate.OrderItem orderItem)
    {
        return new Product
        {
            Id = orderItem.ProductId,
            Name = orderItem.ProductName,
            ImageUrl = orderItem.ProductImageUrl,
        };
    }
}