using eShop.IntegrationEvents;
using eShop.Ordering.Application.Orders.Commands.SetAwaitingValidationOrderStatus;

namespace eShop.Ordering.Application.IntegrationEvents.EventHandlers;

public sealed class GracePeriodConfirmedIntegrationEventHandler(
    IMediator mediator) 
    : IIntegrationEventHandler<GracePeriodConfirmedIntegrationEvent>
{
    /// <summary>
    /// Event handler which confirms that the grace period
    /// has been completed and order will not initially be cancelled.
    /// Therefore, the order process continues for validation. 
    /// </summary>
    /// <param name="integrationEvent">       
    /// </param>
    /// <returns></returns>
    public async Task Handle(GracePeriodConfirmedIntegrationEvent integrationEvent)
    {
        var command = new SetAwaitingValidationOrderStatusCommand(integrationEvent.OrderId);
        await mediator.Send(command);
    }
}
