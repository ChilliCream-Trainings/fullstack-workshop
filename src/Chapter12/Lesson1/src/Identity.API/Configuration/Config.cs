using eShop.Shared.Authentication;

namespace eShop.Identity.API.Configuration;

public class Config
{
    // ApiResources define the apis in your system
    public static IEnumerable<ApiResource> GetApis()
    {
        return
        [
            new(Scopes.Ordering.Audience, "Orders Service")
            {
                Scopes = [..Scopes.Ordering.All]
            },
            new(Scopes.Basket.Audience, "Basket Service")
            {
                Scopes = [..Scopes.Basket.All]
            },
            new(Scopes.Catalog.Audience, "Catalog Service")
            {
                Scopes = [..Scopes.Catalog.All]
            }
        ];
    }

    // ApiScope is used to protect the API 
    //The effect is the same as that of API resources in IdentityServer 3.x
    public static IEnumerable<ApiScope> GetApiScopes()
    {
        return
        [
            new ApiScope(Scopes.Ordering.Read, "Read Access to Orders"),
            new ApiScope(Scopes.Ordering.Write, "Write Access to Orders"),
            new ApiScope(Scopes.Basket.Read, "Read Access to Basket"),
            new ApiScope(Scopes.Basket.Write, "Write Access to Basket"),
            new ApiScope(Scopes.Catalog.Read, "Read Access to Catalog"),
            new ApiScope(Scopes.Catalog.Write, "Write Access to Catalog")
        ];
    }

    // Identity resources are data like user ID, name, or email address of a user
    // see: http://docs.identityserver.io/en/release/configuration/resources.html
    public static IEnumerable<IdentityResource> GetResources()
    {
        return
        [
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        ];
    }

    // client want to access resources (aka scopes)
    public static IEnumerable<Client> GetClients(IConfiguration configuration)
    {
        return
        [
            new()
            {
                ClientId = "webapp",
                ClientName = "WebApp Client",
                ClientSecrets = [new("secret".Sha256())],
                ClientUri = $"{configuration["WebAppClient"]}", // public uri of the client
                AllowedGrantTypes = GrantTypes.Code,
                AllowAccessTokensViaBrowser = false,
                RequireConsent = false,
                AllowOfflineAccess = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                RequirePkce = false,
                RedirectUris =
                [
                    "https://localhost/signin-redirect",
                    $"{configuration["WebAppClient"]}/signin-oidc"
                ],
                PostLogoutRedirectUris = [$"{configuration["WebAppClient"]}/signout-callback-oidc"],
                AllowedScopes =
                [
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    ..Scopes.All
                ],
                AccessTokenLifetime = 60 * 60 * 2, // 2 hours
                IdentityTokenLifetime = 60 * 60 * 2 // 2 hours
            }
        ];
    }
}
