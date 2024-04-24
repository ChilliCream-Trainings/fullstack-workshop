namespace eShop.Chat.Api;

public interface IChatMessageProcessor
{
    void QueueMessageAsync(ChatMessage message);

    Task ProcessAsync(CancellationToken ct);
}
