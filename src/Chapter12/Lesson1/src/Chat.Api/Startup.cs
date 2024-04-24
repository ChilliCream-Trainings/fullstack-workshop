using eShop.Chat.Api;

namespace Microsoft.Extensions.Hosting;

public static class RequestExecutorBuilderExtensions
{
    public static IHostApplicationBuilder AddApplicationServices(
        this IHostApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IChatRepository, ChatRepository>();

        builder.Services.AddScoped<IChatService, ChatService>();

        builder.Services.AddSingleton<ChatMessagesTopic>();
        builder.Services.AddSingleton<ChatStatusTopic>();

        builder.Services.AddSingleton<IChatMessageProcessor, ChatMessageProcessor>();

        builder.Services.AddHostedService<ProcessingWorker>();

        return builder;
    }

    public static IHostApplicationBuilder AddGraphQLServer(this IHostApplicationBuilder builder)
    {
        builder.Services
            .AddGraphQLServer()
            .AddGraphQLConventions()
            .AddInMemorySubscriptions()
            .AddAPITypes()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>()
            .AddSubscriptionType<Subscription>()
            .AddInterfaceType<IMessage>()
            .AddType<DocumentMessage>()
            .AddType<ChatMessage>()
            .AddType<ChatMessageCreated>()
            .AddType<ChatMessageUpdated>();

        return builder;
    }
}
