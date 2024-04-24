namespace eShop.Chat.Api;

public sealed record ChatStatusMessage(Guid ChatId, ChatStatus Status)
{
    public static ChatStatusMessage Changed(Guid chatId, ChatStatus status) =>
        new(chatId, status);
}
