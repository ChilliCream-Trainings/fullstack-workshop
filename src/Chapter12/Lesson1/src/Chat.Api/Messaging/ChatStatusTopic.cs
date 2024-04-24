using HotChocolate.Subscriptions;

namespace eShop.Chat.Api;

public sealed class ChatStatusTopic(
    ITopicEventReceiver eventReceiver,
    ITopicEventSender eventSender)
{
    private const string _topicName = "ChatStatus";

    private static string CreateTopicName(Guid chatId) => $"{_topicName}_{chatId}";

    public async Task NotifyStateChanged(Chat chat, CancellationToken ct)
    {
        await eventSender.SendAsync(
            CreateTopicName(chat.Id),
            ChatStatusMessage.Changed(chat.Id, chat.Status),
            ct);
    }

    public async Task CompleteChat(Guid chatId)
    {
        await eventSender.CompleteAsync(CreateTopicName(chatId));
    }

    public async IAsyncEnumerable<ChatStatusMessage> SubscribeAsync(Guid chatId)
    {
        var stream = await eventReceiver
            .SubscribeAsync<ChatStatusMessage>(CreateTopicName(chatId));

        await foreach (var message in stream.ReadEventsAsync())
        {
            yield return message;
        }
    }
}
