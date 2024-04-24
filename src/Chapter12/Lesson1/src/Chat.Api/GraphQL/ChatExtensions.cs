namespace eShop.Chat.Api;

[ExtendObjectType<Chat>]
public sealed class ChatExtensions
{
    [UsePaging]
    public async Task<IEnumerable<ChatMessage>> GetMessagesAsync(
        [Parent] Chat chat,
        [Service] IChatService chatService,
        CancellationToken cancellationToken)
    {
        return await chatService
            .GetMessageByChatIdAsync(chat.Id, cancellationToken);
    }
}
