using System.Security.Claims;
using eShop.SessionManagement;
using eShop.Shared.Session;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.Extensions.Hosting;

internal sealed class SessionRequestContextEnricher : IRequestContextEnricher
{
    public void Enrich(IRequestContext context)
    {
        if (context.ContextData.TryGetValue(nameof(ClaimsPrincipal), out var value) &&
            value is ClaimsPrincipal
            {
                Identity: { IsAuthenticated: true, Name: not null } identity
            } principal)
        {
            var sub = principal.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var userInfo = new UserInfo(sub, identity.Name, true);
            context.Services.GetRequiredService<DefaultSession>().User = userInfo;
            context.ContextData[nameof(UserInfo)] = userInfo;
        }
    }
}
