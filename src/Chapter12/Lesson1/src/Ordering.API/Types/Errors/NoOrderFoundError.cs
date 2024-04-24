namespace eShop.Ordering.Types;

public record NoOrderFoundError(int OrderId) : IMutationError
{
    public string Message => $"No order found for id {OrderId}";
}