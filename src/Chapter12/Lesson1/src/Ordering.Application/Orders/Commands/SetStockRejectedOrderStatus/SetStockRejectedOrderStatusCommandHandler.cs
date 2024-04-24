using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

namespace eShop.Ordering.Application.Orders.Commands.SetStockRejectedOrderStatus;

public class SetStockRejectedOrderStatusCommandHandler(IOrderRepository orderRepository)
    : IRequestHandler<SetStockRejectedOrderStatusCommand, bool>
{
    /// <summary>
    /// Handler which processes the command when
    /// Stock service rejects the request
    /// </summary>
    /// <param name="command">
    /// <see cref="SetStockRejectedOrderStatusCommand"/> to process
    /// </param>
    /// <param name="cancellationToken">
    /// <see cref="CancellationToken"/> to cancel the operation
    /// </param>
    /// <returns>
    /// <see cref="Task"/> representing the result of the asynchronous operation
    /// </returns>
    public async Task<bool> Handle(SetStockRejectedOrderStatusCommand command, CancellationToken cancellationToken)
    {
        // Simulate a work time for rejecting the stock
        await Task.Delay(10000, cancellationToken);

        var orderToUpdate = await orderRepository.GetOrderAsync(command.OrderNumber, cancellationToken);
        if (orderToUpdate == null)
        {
            return false;
        }

        orderToUpdate.SetCancelledStatusWhenStockIsRejected(command.OrderStockItems);

        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
