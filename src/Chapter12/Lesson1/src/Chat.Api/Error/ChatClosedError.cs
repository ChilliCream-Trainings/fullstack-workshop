namespace eShop.Chat.Api;

public sealed class ChatClosedError(Guid chatId)
    : Exception($"Chat with id '{chatId}' is closed.");
