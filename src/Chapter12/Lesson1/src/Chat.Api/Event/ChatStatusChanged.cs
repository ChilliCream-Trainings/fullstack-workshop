namespace eShop.Chat.Api;

public sealed record ChatStatusChanged(Guid ChatId) : IChatMessageEvent;
