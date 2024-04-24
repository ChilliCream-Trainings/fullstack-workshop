using HotChocolate.Subscriptions;

namespace eShop.Chat.Api;

public sealed class ChatMessagesTopic(
    ITopicEventReceiver eventReceiver,
    ITopicEventSender eventSender)
{
    private const string _topicName = "ChatMessages";

    private static string CreateTopicName(Guid chatId) => $"{_topicName}_{chatId}";

    public async Task NotifyMessageCreated(ChatMessage message, CancellationToken ct)
    {
        await eventSender.SendAsync(
            CreateTopicName(message.ChatId),
            ChatMessageEventMessage.Created(message.Id, message.Role),
            ct);
    }

    public async Task NotifyMessageUpdated(ChatMessage message, CancellationToken ct)
    {
        await eventSender.SendAsync(
            CreateTopicName(message.ChatId),
            ChatMessageEventMessage.Updated(message.Id, message.Role),
            ct);
    }

    public async Task CompleteChat(Guid chatId)
    {
        await eventSender.CompleteAsync(CreateTopicName(chatId));
    }

    public async IAsyncEnumerable<ChatMessageEventMessage> SubscribeAsync(Guid chatId)
    {
        var stream = await eventReceiver
            .SubscribeAsync<ChatMessageEventMessage>(CreateTopicName(chatId));

        await foreach (var message in stream.ReadEventsAsync())
        {
            yield return message;
        }
    }
}
