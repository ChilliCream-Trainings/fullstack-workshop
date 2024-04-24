namespace eShop.Chat.Api;

[ExtendObjectType<ChatMessageCreated>]
public sealed class ChatMessageCreatedExtensions
{
    [BindMember(nameof(ChatMessageCreated.MessageId))]
    public async Task<ChatMessage?> GetMessageAsync(
        [Parent] ChatMessageCreated parent,
        [Service] IChatService chatService,
        CancellationToken cancellationToken)
    {
        return await chatService.GetMessageByIdAsync(parent.MessageId, cancellationToken);
    }
}
