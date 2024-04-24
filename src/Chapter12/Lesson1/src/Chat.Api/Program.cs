var builder = WebApplication.CreateBuilder(args);

builder
    .AddServiceDefaults()
    .AddDefaultAuthentication()
    .AddApplicationServices()
    .AddGraphQLServer();

var app = builder.Build();

app.MapDefaultEndpoints();
app.MapGraphQL();

app.RunWithGraphQLCommands(args);

