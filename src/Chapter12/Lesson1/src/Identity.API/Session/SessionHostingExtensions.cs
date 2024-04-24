using eShop.Identity.Session;

namespace Microsoft.Extensions.Hosting;

public static class SessionHostingExtensions
{
    public static IHostApplicationBuilder AddSessionAccessor(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<ISessionAccessor, SessionAccessor>();

        builder.Services.AddScopedServiceInitializer<ISessionAccessor>((from, to) =>
        {
            if (from is SessionAccessor scoped && to is SessionAccessor resolver)
            {
                resolver.From(scoped);
            }
        });
        return builder;
    }
}
