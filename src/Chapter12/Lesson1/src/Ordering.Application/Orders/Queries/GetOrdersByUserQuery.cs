using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Contracts;
using eShop.SessionManagement;

namespace eShop.Ordering.Application.Orders.Queries;

public class GetOrdersByUserQuery(ISession session, IOrdersByUserIdDataLoader ordersByUserId)
{
    public async Task<Page<Order>> ExecuteAsync(
        PagingArguments pagingArguments,
        bool withDetails = false,
        CancellationToken cancellationToken = default)
    {
        return await ordersByUserId.LoadAsync(
            new OrderUserKey(session.User.Id, withDetails, pagingArguments),
            cancellationToken);
    }
}