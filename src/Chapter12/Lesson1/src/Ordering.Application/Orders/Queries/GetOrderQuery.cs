using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Contracts;
using eShop.SessionManagement;

namespace eShop.Ordering.Application.Orders.Queries;

public sealed class GetOrderQuery(ISession session, IOrderByIdDataLoader orderById) 
{
    public async Task<Order?> ExecuteAsync(
        int orderId,
        bool withDetails = false, 
        CancellationToken cancellationToken = default)
    {
        var order = await orderById.LoadAsync(new OrderKey(orderId, withDetails), cancellationToken);
        return session.User.Id.Equals(order.UserId) ? order : null;
    }
}