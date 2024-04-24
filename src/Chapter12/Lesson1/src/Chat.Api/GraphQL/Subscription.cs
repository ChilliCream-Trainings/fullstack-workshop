namespace eShop.Chat.Api;

public sealed class Subscription
{
    public async IAsyncEnumerable<IChatMessageEvent> OnMessageSubscriber(
        Guid chatId,
        [Service] IChatService service)
    {
        var messages = service.SubscribeToChatMessagesAsync(chatId);
        await foreach (var message in messages)
        {
            yield return message;
        }
    }

    [Subscribe(With = nameof(OnMessageSubscriber))]
    public IChatMessageEvent OnChatMessagesUpdated(
        [EventMessage] IChatMessageEvent @event,
        [ID] Guid chatId)
        => @event;

    public async IAsyncEnumerable<ChatStatusChanged> OnChatStatusChangedSubscribe(
        Guid chatId,
        [Service] IChatService service)
    {
        var messages = service.SubscribeToChatStatusAsync(chatId);
        await foreach (var message in messages)
        {
            yield return message;
        }
    }

    [Subscribe(With = nameof(OnChatStatusChangedSubscribe))]
    public ChatStatusChanged OnChatStatusChanged(
        [EventMessage] ChatStatusChanged @event,
        [ID] Guid chatId)
        => @event;
}
