namespace eShop.Chat.Api;

public sealed record ChatMessageCreated(Guid MessageId) : IChatMessageEvent;