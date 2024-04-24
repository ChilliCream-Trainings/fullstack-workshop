using eShop.Ordering.Application.Common.ReadModels;

namespace eShop.Ordering.Infrastructure.DataLoaders;

internal static class OrderQueryableExtensions
{
    public static IQueryable<Order> MapOrder(
        this IQueryable<Domain.AggregatesModels.OrderAggregate.Order> query,
        bool withDetails)
    {
        if (withDetails)
        {
            return query.Select(
                o => new Order
                {
                    Id = o.Id,
                    Date = o.Date,
                    Status = (OrderStatus)o.Status,
                    Address = new Address
                    {
                        Street = o.Address.Street,
                        City = o.Address.City,
                        State = o.Address.State,
                        Country = o.Address.Country,
                        ZipCode = o.Address.ZipCode,
                    },
                    UserId = o.UserId,
                    Description = o.Description,
                    Total = o.Total,
                    Items = o.Items.Select(
                        oi => new OrderItem
                        {
                            Product = new Product
                            {
                                Id = oi.ProductId,
                                Name = oi.ProductName,
                                ImageUrl = oi.ProductImageUrl
                            },
                            UnitPrice = oi.UnitPrice,
                            Units = oi.Units,
                        }).ToArray(),
                });
        }

        return query.Select(
            o => new Order
            {
                Id = o.Id,
                Date = o.Date,
                Status = (OrderStatus)o.Status,
                UserId = o.UserId,
                Description = o.Description,
                Total = o.Total,
            });
    }
}