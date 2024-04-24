using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

namespace eShop.Ordering.Application.Orders.Commands.CancelOrder;

public class CancelOrderCommandHandler(IOrderRepository orderRepository) 
    : IRequestHandler<CancelOrderCommand, bool>
{
    /// <summary>
    /// Handler which processes the command when
    /// customer executes cancel order from app
    /// </summary>
    /// <param name="command">
    /// <see cref="CancelOrderCommand"/> to process
    /// </param>
    /// <param name="cancellationToken">
    /// <see cref="CancellationToken"/> to cancel the operation
    /// </param>
    /// <returns></returns>
    public async Task<bool> Handle(CancelOrderCommand command, CancellationToken cancellationToken)
    {
        var orderToUpdate = await orderRepository.GetOrderAsync(command.OrderId, cancellationToken);

        if (orderToUpdate == null)
        {
            return false;
        }

        orderToUpdate.SetCancelledStatus();
        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}

