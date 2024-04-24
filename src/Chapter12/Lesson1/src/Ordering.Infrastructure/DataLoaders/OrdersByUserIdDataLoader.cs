using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Contracts;
using GreenDonut;
using HotChocolate.Data;

namespace eShop.Ordering.Infrastructure.DataLoaders;

internal sealed class OrdersByUserIdDataLoader(
    IServiceProvider serviceProvider,
    DataLoaderOptions options)
    : OrderingCacheDataLoaderBase<OrderUserKey, Page<Order>>(serviceProvider, options)
    , IOrdersByUserIdDataLoader
{
    protected override async Task<Page<Order>> LoadSingleAsync(
        OrderUserKey key,
        OrderingContext context,
        CancellationToken cancellationToken)
    {
        return await context.Orders
            .Where(o => o.UserId == key.UserId)
            // TODO DataSetKey does not support dates
            // .OrderByDescending(o => o.Date)
            // .ThenBy(t => t.Id)
            .MapOrder(key.WithDetails)
            .OrderByDescending(o => o.Id)
            .ToPageAsync(key.PagingArguments, cancellationToken);
    }
}
