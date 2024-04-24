using eShop.IntegrationEvents;
using eShop.Ordering.Application.Orders.Commands.SetPaidOrderStatus;

namespace eShop.Ordering.Application.IntegrationEvents.EventHandlers;

public class OrderPaymentSucceededIntegrationEventHandler(
    IMediator mediator) 
    : IIntegrationEventHandler<OrderPaymentSucceededIntegrationEvent>
{
    public async Task Handle(OrderPaymentSucceededIntegrationEvent integrationEvent)
    {
        var command = new SetPaidOrderStatusCommand(integrationEvent.OrderId);
        await mediator.Send(command);
    }
}
