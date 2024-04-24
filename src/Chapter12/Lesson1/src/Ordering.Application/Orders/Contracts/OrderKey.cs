namespace eShop.Ordering.Application.Orders.Contracts;

public readonly record struct OrderKey(int Id, bool WithDetails);