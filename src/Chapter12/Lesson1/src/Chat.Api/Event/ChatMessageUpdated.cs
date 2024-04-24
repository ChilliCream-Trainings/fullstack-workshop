namespace eShop.Chat.Api;

public sealed record ChatMessageUpdated(Guid MessageId) : IChatMessageEvent;
