using eShop.IntegrationEvents;
using eShop.Ordering.Application.Orders.Commands.SetStockConfirmedOrderStatus;

namespace eShop.Ordering.Application.IntegrationEvents.EventHandlers;

public class OrderStockConfirmedIntegrationEventHandler(
    IMediator mediator) 
    : IIntegrationEventHandler<OrderStockConfirmedIntegrationEvent>
{
    public async Task Handle(OrderStockConfirmedIntegrationEvent integrationEvent)
    {
        var command = new SetStockConfirmedOrderStatusCommand(integrationEvent.OrderId);
        await mediator.Send(command);
    }
}
