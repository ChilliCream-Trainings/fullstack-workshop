using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.Extensions.Hosting;

public static class AuthenticationExtensions
{
    /// <summary>
    /// Enables authentication using JWT bearer tokens.
    ///
    /// <example>
    /// appsettings.json:
    /// <code>
    /// {
    ///   "Identity": {
    ///     "Url": "http://identity",
    ///     "Audience": "basket"
    ///    }
    /// }
    /// </code>
    /// </example>
    /// </summary>
    /// <param name="builder"></param>
    /// <returns></returns>
    public static IHostApplicationBuilder AddDefaultAuthentication(
        this IHostApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        var identitySection = configuration.GetSection("Identity");

        if (!identitySection.Exists())
        {
            // No identity section, so no authentication
            return builder;
        }

        services
            .AddAuthentication()
            .AddJwtBearer(options =>
            {
                var identityUrl = identitySection.GetValue<string>("Url");
                var audience = identitySection.GetValue<string>("Audience");

                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = audience;
                options.TokenValidationParameters.ValidateAudience = false;
            });

        services.AddAuthorization();

        return builder;
    }
}
