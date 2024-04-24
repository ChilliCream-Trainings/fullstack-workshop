namespace eShop.Ordering.Application.Orders.Contracts;

public readonly record struct OrderUserKey(string UserId, bool WithDetails, PagingArguments PagingArguments);