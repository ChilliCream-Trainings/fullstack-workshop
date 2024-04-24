using ISession = eShop.SessionManagement.ISession;

namespace eShop.Chat.Api;

/// <summary>
/// 
/// </summary>
/// <remarks>
/// IMPORTANT: This methods only be used directly from the GraphQL Layer as they us data loaders. 
/// </remarks>
public sealed class ChatService(
    IChatRepository repository,
    ChatMessagesTopic chatMessagesTopic,
    ChatStatusTopic chatStatusTopic,
    ISession session,
    IChatByIdDataLoader chatById,
    IMessagesByIdDataLoader messagesById,
    IChatMessageProcessor processor)
    : IChatService
{
    public async Task<Chat> CreateChatAsync(CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            throw UnauthorizedError.Create();
        }

        var chat = await repository.CreateChatAsync(session.User.Id, ct);

        return chat;
    }

    public async Task<Chat?> GetChatByIdAsync(Guid chatId, CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            return null;
        }

        var chat = await chatById.LoadAsync(chatId, ct);

        if (chat is null)
        {
            return null;
        }

        if (chat.UserId != session.User.Id)
        {
            // to prevent leaking information about the existence of a chat
            return null;
        }

        return chat;
    }

    public async Task<IReadOnlyList<ChatMessage>> GetChatMessagesByChatIdAsync(
        Guid chatId,
        CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            return Array.Empty<ChatMessage>();
        }

        var chat = await chatById.LoadAsync(chatId, ct);

        if (chat is null)
        {
            return Array.Empty<ChatMessage>();
        }

        if (chat.UserId != session.User.Id)
        {
            // to prevent leaking information about the existence of a chat
            return Array.Empty<ChatMessage>();
        }

        var messages = await repository.GetMessagesByChatIdAsync(chatId, ct);

        return messages
            .Where(x => x.Role is ChatMessageRole.User or ChatMessageRole.Assistant)
            .ToArray();
    }

    public async Task<ChatMessage?> GetMessageByIdAsync(Guid messageId, CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            return null;
        }

        var message = await messagesById.LoadAsync(messageId, ct);
        if (message is null)
        {
            return null;
        }

        var chat = await chatById.LoadAsync(message.ChatId, ct);
        if (chat is null)
        {
            return null;
        }

        if (chat.UserId != session.User.Id)
        {
            return null;
        }

        return message;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<ChatMessage>> GetMessageByChatIdAsync(
        Guid chatId,
        CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            return Array.Empty<ChatMessage>();
        }

        var chat = await chatById.LoadAsync(chatId, ct);
        if (chat is null)
        {
            return Array.Empty<ChatMessage>();
        }

        if (chat.UserId != session.User.Id)
        {
            return Array.Empty<ChatMessage>();
        }

        var messages = await repository.GetMessagesByChatIdAsync(chatId, ct);
        return messages;
    }

    public async Task<ChatMessage> SendMessageAsync(
        Guid chatId,
        string content,
        CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            throw UnauthorizedError.Create();
        }

        var chat = await chatById.LoadAsync(chatId, ct);

        if (chat is null)
        {
            throw new ChatNotFoundError(chatId);
        }

        if (chat.UserId != session.User.Id)
        {
            // to prevent leaking information about the existence of a chat
            throw new ChatNotFoundError(chatId);
        }

        if (chat.Status == ChatStatus.Closed)
        {
            throw new ChatClosedError(chatId);
        }

        if (chat.Status == ChatStatus.Processing)
        {
            throw new ChatNotReadyForMessageError(chatId);
        }

        var message =
            await repository.CreateMessageAsync(chatId, content, ChatMessageRole.User, ct);

        await chatMessagesTopic.NotifyMessageCreated(message, ct);
        processor.QueueMessageAsync(message);

        return message;
    }

    /// <inheritdoc />
    public async Task<Chat> CloseChatAsync(Guid chatId, CancellationToken ct)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            throw UnauthorizedError.Create();
        }

        var chat = await chatById.LoadAsync(chatId, ct);

        if (chat is null)
        {
            throw new ChatNotFoundError(chatId);
        }

        if (chat.UserId != session.User.Id)
        {
            // to prevent leaking information about the existence of a chat
            throw new ChatNotFoundError(chatId);
        }

        chat.Status = ChatStatus.Closed;

        await chatStatusTopic.NotifyStateChanged(chat, ct);
        await chatStatusTopic.CompleteChat(chatId);
        await chatMessagesTopic.CompleteChat(chatId);

        return chat;
    }

    public async IAsyncEnumerable<IChatMessageEvent> SubscribeToChatMessagesAsync(Guid chatId)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            yield break;
        }

        // IMPORTANT! You cannot use dataloaders in SubscribeWith methods!!!
        var chat = await repository.GetChatByIdAsync(chatId, CancellationToken.None);
        if (chat is null)
        {
            yield break;
        }

        if (chat.UserId != session.User.Id)
        {
            yield break;
        }

        await foreach (var message in chatMessagesTopic.SubscribeAsync(chatId))
        {
            switch (message)
            {
                case { Role: ChatMessageRole.System }:
                    // We dont want to send system messages to the client.
                    break;

                case { Kind: ChatMessageKind.Created }:
                    yield return new ChatMessageCreated(message.MessageId);
                    break;

                case { Kind: ChatMessageKind.Updated }:
                    yield return new ChatMessageUpdated(message.MessageId);
                    break;
            }
        }
    }

    public async IAsyncEnumerable<ChatStatusChanged> SubscribeToChatStatusAsync(Guid chatId)
    {
        if (session.User is not { IsAuthenticated: true })
        {
            yield break;
        }

        // IMPORTANT! You cannot use dataloaders in SubscribeWith methods!!!
        var chat = await repository.GetChatByIdAsync(chatId, CancellationToken.None);
        if (chat is null)
        {
            yield break;
        }

        if (chat.UserId != session.User.Id)
        {
            yield break;
        }

        await foreach (var _ in chatStatusTopic.SubscribeAsync(chatId))
        {
            yield return new ChatStatusChanged(chatId);
        }
    }
}
