using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Queries;
using eShop.Ordering.Types;
using HotChocolate.Types.Pagination;

namespace eShop.Ordering.Types;

public sealed class Viewer
{
    [UsePaging]
    public async Task<Connection<Order>> GetOrdersAsync(
        PagingArguments pagingArguments,
        [WithOrderDetails] bool withDetails,
        GetOrdersByUserQuery getOrdersByUserQuery,
        CancellationToken cancellationToken)
    {
        return await getOrdersByUserQuery
            .ExecuteAsync(pagingArguments, withDetails, cancellationToken)
            .ToConnectionAsync();
    }
}
