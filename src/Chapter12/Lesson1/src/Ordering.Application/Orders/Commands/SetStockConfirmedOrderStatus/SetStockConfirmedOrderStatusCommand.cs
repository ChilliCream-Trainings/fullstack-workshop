namespace eShop.Ordering.Application.Orders.Commands.SetStockConfirmedOrderStatus;

public record SetStockConfirmedOrderStatusCommand(int OrderNumber) : IRequest<bool>;
