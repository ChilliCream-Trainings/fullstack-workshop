using eShop.IntegrationEvents;
using eShop.Ordering.Application.Orders.Commands.CancelOrder;

namespace eShop.Ordering.Application.IntegrationEvents.EventHandlers;

public class OrderPaymentFailedIntegrationEventHandler(
    IMediator mediator) 
    : IIntegrationEventHandler<OrderPaymentFailedIntegrationEvent>
{
    public async Task Handle(OrderPaymentFailedIntegrationEvent integrationEvent)
    {
        var command = new CancelOrderCommand(integrationEvent.OrderId);
        await mediator.Send(command);
    }
}
