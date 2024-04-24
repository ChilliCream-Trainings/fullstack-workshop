using HotChocolate.Execution;

namespace eShop.Catalog.Sessions;

internal sealed class SessionRequestContextEnricher : IRequestContextEnricher
{
    public void Enrich(IRequestContext context)
    {
        context.ContextData[nameof(UserInfo)] =
            context.Services.GetRequiredService<SessionManagement.ISession>().User;
    }
}
