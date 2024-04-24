namespace eShop.Chat.Api;

public sealed class ChatNotFoundError(Guid chatId)
    : Exception($"Chat with id '{chatId}' not found.");
