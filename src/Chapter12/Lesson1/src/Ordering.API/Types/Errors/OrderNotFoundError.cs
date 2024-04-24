namespace eShop.Ordering.Types;

public sealed record OrderNotFoundError(int OrderId) : IMutationError
{
    public string Message => $"Order with id {OrderId} was not found.";
}