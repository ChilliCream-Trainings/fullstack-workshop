namespace eShop.Ordering.Application.Orders.Commands.SetStockRejectedOrderStatus;

public record SetStockRejectedOrderStatusCommand(int OrderNumber, List<int> OrderStockItems) : IRequest<bool>;
