using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

namespace eShop.Ordering.Application.Orders.Commands.SetAwaitingValidationOrderStatus;

public class SetAwaitingValidationOrderStatusCommandHandler(IOrderRepository orderRepository)
    : IRequestHandler<SetAwaitingValidationOrderStatusCommand, bool>
{
    /// <summary>
    /// Handler which processes the command when
    /// grace period has finished
    /// </summary>
    /// <param name="command">
    /// <see cref="SetAwaitingValidationOrderStatusCommand"/> to process
    /// </param>
    /// <param name="cancellationToken">
    /// <see cref="CancellationToken"/> to cancel the operation
    /// </param>
    /// <returns>
    /// <see cref="Task"/> representing the result of the asynchronous operation
    /// </returns>
    public async Task<bool> Handle(SetAwaitingValidationOrderStatusCommand command, CancellationToken cancellationToken)
    {
        var orderToUpdate = await orderRepository.GetOrderAsync(command.OrderId, cancellationToken);

        if (orderToUpdate == null)
        {
            return false;
        }

        orderToUpdate.SetAwaitingValidationStatus();
        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }
}
