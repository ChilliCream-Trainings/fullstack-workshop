using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

namespace eShop.Ordering.Application.Orders.Commands.SetStockConfirmedOrderStatus;

public class SetStockConfirmedOrderStatusCommandHandler(IOrderRepository orderRepository)
    : IRequestHandler<SetStockConfirmedOrderStatusCommand, bool>
{
    /// <summary>
    /// Handler which processes the command when
    /// Stock service confirms the request
    /// </summary>
    /// <param name="command">
    /// <see cref="SetStockConfirmedOrderStatusCommand"/> to process
    /// </param>
    /// <param name="cancellationToken">
    /// <see cref="CancellationToken"/> to cancel the operation
    /// </param>
    /// <returns>
    /// <see cref="Task"/> representing the result of the asynchronous operation
    /// </returns>
    public async Task<bool> Handle(SetStockConfirmedOrderStatusCommand command, CancellationToken cancellationToken)
    {
        // Simulate a work time for confirming the stock
        await Task.Delay(10000, cancellationToken);

        var orderToUpdate = await orderRepository.GetOrderAsync(command.OrderNumber, cancellationToken);
        if (orderToUpdate == null)
        {
            return false;
        }

        orderToUpdate.SetStockConfirmedStatus();
        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
