namespace eShop.Chat.Api;

public static class Dataloaders
{
    [DataLoader]
    public static async Task<IReadOnlyDictionary<Guid, Chat>> GetChatById(
        IReadOnlyList<Guid> ids,
        [Service] IChatRepository repository,
        CancellationToken ct)
    {
        var chats = await repository.GetChatsByIdsAsync(ids, ct);

        return chats.ToDictionary(x => x.Id);
    }

    [DataLoader]
    public static async Task<IReadOnlyDictionary<Guid, ChatMessage>> GetMessagesById(
        IReadOnlyList<Guid> ids,
        [Service] IChatRepository repository,
        CancellationToken ct)
    {
        var messages = await repository.GetMessagesByIdsAsync(ids, ct);

        return messages.ToDictionary(x => x.Id);
    }
}
