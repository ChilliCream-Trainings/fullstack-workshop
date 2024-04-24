namespace eShop.Chat.Api;

public interface IChatService
{
    Task<Chat> CreateChatAsync(CancellationToken ct);

    Task<Chat?> GetChatByIdAsync(Guid chatId, CancellationToken ct);

    Task<ChatMessage> SendMessageAsync(Guid chatId, string content, CancellationToken ct);

    Task<ChatMessage?> GetMessageByIdAsync(Guid messageId, CancellationToken ct);

    Task<IEnumerable<ChatMessage>> GetMessageByChatIdAsync(Guid chatId, CancellationToken ct);

    IAsyncEnumerable<IChatMessageEvent> SubscribeToChatMessagesAsync(Guid chatId);

    IAsyncEnumerable<ChatStatusChanged> SubscribeToChatStatusAsync(Guid chatId);

    Task<Chat> CloseChatAsync(Guid chatId, CancellationToken ct);
}
