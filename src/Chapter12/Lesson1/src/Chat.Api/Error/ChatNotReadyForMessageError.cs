namespace eShop.Chat.Api;

public sealed class ChatNotReadyForMessageError(Guid chatId)
    : Exception($"Chat with id '{chatId}' is not ready for messages.");
