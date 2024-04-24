using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

namespace eShop.Ordering.Application.Orders.Commands.ShipOrder;

public class ShipOrderCommandHandler(IOrderRepository orderRepository) 
    : IRequestHandler<ShipOrderCommand, bool>
{
    /// <summary>
    /// Handler which processes the command when
    /// administrator executes ship order from app
    /// </summary>
    /// <param name="command">
    /// <see cref="ShipOrderCommand"/> to process
    /// </param>
    /// <param name="cancellationToken">
    /// <see cref="CancellationToken"/> to cancel the operation
    /// </param>
    /// <returns></returns>
    public async Task<bool> Handle(ShipOrderCommand command, CancellationToken cancellationToken)
    {
        var orderToUpdate = await orderRepository.GetOrderAsync(command.OrderNumber, cancellationToken);
        if (orderToUpdate == null)
        {
            return false;
        }

        orderToUpdate.SetShippedStatus();
        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
