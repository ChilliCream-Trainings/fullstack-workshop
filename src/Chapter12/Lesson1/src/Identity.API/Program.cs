using eShop.EventBus;
using eShop.IntegrationEvents;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddControllersWithViews();

builder.AddNpgsqlDbContext<ApplicationDbContext>("IdentityDB");

// Apply database migration automatically. Note that this approach is not
// recommended for production scenarios. Consider generating SQL scripts from
// migrations instead.
builder.Services.AddMigration<ApplicationDbContext, UsersSeed>();

builder.AddSessionAccessor();
builder.AddAspNetIdentity();
builder.AddIdentityServer();
builder.AddGraphQLServer();

builder
    .AddRabbitMQEventBus("event-bus")
    .AddSubscription<OrderStartedIntegrationEvent, OrderStartedIntegrationEventHandler>();

var app = builder.Build();

app.MapDefaultEndpoints();

app.UseStaticFiles();

// This cookie policy fixes login issues with Chrome 80+ using HTTP
app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });
app.UseRouting();
app.UseIdentityServer();
app.UseAuthorization();

app.MapDefaultControllerRoute();
app.MapGraphQLHttp();

app.RunWithGraphQLCommands(args);

file static class Extensions
{
    public static void AddIdentityServer(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddIdentityServer(ConfigureIdentityServer)
            .AddInMemoryIdentityResources(Config.GetResources())
            .AddInMemoryApiScopes(Config.GetApiScopes())
            .AddInMemoryApiResources(Config.GetApis())
            .AddInMemoryClients(Config.GetClients(builder.Configuration))
            .AddAspNetIdentity<User>()
            .AddProfileService<ProfileService>()
            // TODO: Not recommended for production - you need to store your key material somewhere secure
            .AddDeveloperSigningCredential();

        builder.Services.AddAuthentication().AddLocalApi();
    }

    public static void AddAspNetIdentity(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
    }

    private static void ConfigureIdentityServer(IdentityServerOptions options)
    {
        options.IssuerUri = "null";
        options.Authentication.CookieLifetime = TimeSpan.FromHours(2);

        options.Events.RaiseErrorEvents = true;
        options.Events.RaiseInformationEvents = true;
        options.Events.RaiseFailureEvents = true;
        options.Events.RaiseSuccessEvents = true;

        // TODO: Remove this line in production.
        options.KeyManagement.Enabled = false;
    }
}

public class OrderStartedIntegrationEventHandler(
    ILogger<OrderStartedIntegrationEventHandler> logger)
    : IIntegrationEventHandler<OrderStartedIntegrationEvent>
{
    /// <inheritdoc />
    public Task Handle(OrderStartedIntegrationEvent integrationEvent)
    {
        logger.LogInformation("Handling integration event {IntegrationEvent}", integrationEvent);
        return Task.CompletedTask;
    }
}
