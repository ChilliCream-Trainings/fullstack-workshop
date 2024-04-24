namespace eShop.Ordering.Application.Orders.Commands.CancelOrder;

public record CancelOrderCommand(int OrderId) : IRequest<bool>;

