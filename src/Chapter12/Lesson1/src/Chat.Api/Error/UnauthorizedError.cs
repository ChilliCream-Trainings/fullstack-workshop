namespace eShop.Chat.Api;

public class UnauthorizedError(string message) : Exception(message)
{
    public static UnauthorizedError Create() =>
        new("You are not authorized to perform this action.");
}
