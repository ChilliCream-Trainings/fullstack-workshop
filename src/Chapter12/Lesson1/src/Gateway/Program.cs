var builder = WebApplication.CreateBuilder(args);

builder
    .AddServiceDefaults();

builder.Services
    .AddCors()
    .AddHeaderPropagation(
        c =>
        {
            c.Headers.Add("GraphQL-Preflight");
            c.Headers.Add("Authorization");
        });

builder.Services
    .AddHttpClient("Fusion")
    .AddHeaderPropagation();

builder.Services
    .AddFusionGatewayServer()
    .ConfigureFromFile("./gateway.fgp")
    .AddServiceDiscoveryRewriter()
    .CoreBuilder
    .ModifyRequestOptions(c => c.IncludeExceptionDetails = true);

var app = builder.Build();

app.UseWebSockets();
app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHeaderPropagation();
app.MapGraphQL();

app.RunWithGraphQLCommands(args);
