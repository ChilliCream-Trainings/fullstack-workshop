namespace eShop.Ordering.Application.Orders.Commands.ShipOrder;

public record ShipOrderCommand(int OrderNumber) : IRequest<bool>;
