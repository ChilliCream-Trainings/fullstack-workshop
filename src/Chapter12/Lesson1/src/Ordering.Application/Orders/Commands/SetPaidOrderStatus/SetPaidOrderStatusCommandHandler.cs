using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

namespace eShop.Ordering.Application.Orders.Commands.SetPaidOrderStatus;

public class SetPaidOrderStatusCommandHandler(IOrderRepository orderRepository)
    : IRequestHandler<SetPaidOrderStatusCommand, bool>
{
    /// <summary>
    /// Handler which processes the command when
    /// Shipment service confirms the payment
    /// </summary>
    /// <param name="command">
    /// <see cref="SetPaidOrderStatusCommand"/> to process
    /// </param>
    /// <param name="cancellationToken">
    /// <see cref="CancellationToken"/> to cancel the operation
    /// </param>
    /// <returns></returns>
    public async Task<bool> Handle(SetPaidOrderStatusCommand command, CancellationToken cancellationToken)
    {
        // Simulate a work time for validating the payment
        await Task.Delay(10000, cancellationToken);

        var orderToUpdate = await orderRepository.GetOrderAsync(command.OrderNumber, cancellationToken);
        if (orderToUpdate == null)
        {
            return false;
        }

        orderToUpdate.SetPaidStatus();
        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
