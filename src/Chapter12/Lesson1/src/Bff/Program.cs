using Duende.Bff.Yarp;
using eShop.Shared.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.AddOpenIdConnect();

builder.Services.AddBff().AddRemoteApis();

builder.AddServiceDefaults();
builder.Services.AddHttpForwarderWithServiceDiscovery();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseBff();

app.MapBffManagementEndpoints();

app.MapRemoteBffApiEndpoint("/graphql", "http://localhost:5220/graphql")
    .WithOptionalUserAccessToken();

app.MapForwarder("/{**catch-all}", "http://ui");

app.Run();

public static class Authentication
{
    public static IHostApplicationBuilder AddOpenIdConnect(this IHostApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        var identitySection = configuration.GetSection("Identity");

        if (!identitySection.Exists())
        {
            // No identity section, so no authentication
            return builder;
        }

        const string oidcScheme = "oidc";
        const string cookieScheme = "cookie";

        services
            .AddAuthentication(options =>
            {
                options.DefaultScheme = cookieScheme;
                options.DefaultChallengeScheme = oidcScheme;
                options.DefaultSignOutScheme = oidcScheme;
            })
            .AddCookie(cookieScheme,
                options =>
                {
                    options.Cookie.Name = "__Host-bff";
                    options.Cookie.SameSite = SameSiteMode.Strict;
                })
            .AddOpenIdConnect(oidcScheme,
                options =>
                {
                    var identityUrl = identitySection.GetValue<string>("Url");

                    options.Authority = identityUrl;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters.ValidateAudience = false;
                    options.ClientId = "webapp";
                    options.ClientSecret = "secret";

                    options.ResponseType = "code";
                    options.ResponseMode = "query";

                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.MapInboundClaims = false;
                    options.SaveTokens = true;

                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("offline_access");
                    foreach (var scope in Scopes.All)
                    {
                        options.Scope.Add(scope);
                    }
                });

        services.AddAuthorization();

        return builder;
    }
}
