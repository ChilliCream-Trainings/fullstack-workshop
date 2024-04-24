namespace eShop.Chat.Api;

[ExtendObjectType<ChatStatusChanged>]
public sealed class ChatStatusChangedExtensions
{
    [BindMember(nameof(ChatStatusChanged.ChatId))]
    public async Task<Chat?> GetChatAsync(
        [Parent] ChatStatusChanged parent,
        [Service] IChatService chatService,
        CancellationToken cancellationToken)
    {
        return await chatService.GetChatByIdAsync(parent.ChatId, cancellationToken);
    }
}
