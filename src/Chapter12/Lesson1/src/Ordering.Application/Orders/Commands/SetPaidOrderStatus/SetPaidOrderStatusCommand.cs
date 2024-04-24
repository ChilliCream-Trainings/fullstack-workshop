namespace eShop.Ordering.Application.Orders.Commands.SetPaidOrderStatus;

public record SetPaidOrderStatusCommand(int OrderNumber) : IRequest<bool>;
