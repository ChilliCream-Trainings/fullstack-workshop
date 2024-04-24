using eShop.IntegrationEvents;
using eShop.Ordering.Application.Orders.Commands.SetStockRejectedOrderStatus;

namespace eShop.Ordering.Application.IntegrationEvents.EventHandlers;
public class OrderStockRejectedIntegrationEventHandler(
    IMediator mediator) 
    : IIntegrationEventHandler<OrderStockRejectedIntegrationEvent>
{
    public async Task Handle(OrderStockRejectedIntegrationEvent integrationEvent)
    {
        var orderStockRejectedItems = integrationEvent.OrderStockItems
            .FindAll(c => !c.HasStock)
            .Select(c => c.ProductId)
            .ToList();
        var command = new SetStockRejectedOrderStatusCommand(integrationEvent.OrderId, orderStockRejectedItems);
        await mediator.Send(command);
    }
}
