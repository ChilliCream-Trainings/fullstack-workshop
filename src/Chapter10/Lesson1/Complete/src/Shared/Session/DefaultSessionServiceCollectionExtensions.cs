using System.Security.Claims;
using eShop.SessionManagement;
using eShop.Shared.Session;
using Microsoft.AspNetCore.Http;
using ISession = eShop.SessionManagement.ISession;

namespace Microsoft.Extensions.DependencyInjection;

public static class DefaultSessionServiceCollectionExtensions
{
    public static IServiceCollection AddDefaultSession(this IServiceCollection builder)
    {
        builder.AddHttpContextAccessor();
        builder.AddScoped<DefaultSession>(sp =>
        {
            // TODO decide where to create the session. Currenlty it's a mess
            var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
            if (httpContextAccessor.HttpContext is
                { User.Identity: { IsAuthenticated: true, Name: not null } identity } ctx)
            {
                var sub = ctx.User.Claims.FirstOrDefault(x
                    => x.Type is ClaimTypes.NameIdentifier or "sub")!;

                return new DefaultSession
                {
                    User = new UserInfo(sub.Value, identity.Name ?? "", true)
                };
            }

            return new DefaultSession
            {
                User = new UserInfo("anonymous", "anonymous", false)
            };
        });
        builder.AddScoped<ISession>(sp => sp.GetRequiredService<DefaultSession>());
        builder.AddScopedServiceInitializer<DefaultSession>((from, to) => to.From(from));
        return builder;
    }
}
