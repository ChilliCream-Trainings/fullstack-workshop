var builder = WebApplication.CreateBuilder(args);

builder.AddRabbitMQEventBus("event-bus");

builder
    .AddServiceDefaults()
    .AddDefaultAuthentication()
    .AddApplicationLayer()
    .AddInfrastructureLayer();

builder.Services
    .AddGraphQLServer()
    .AddGraphQLConventions()
    .AddTypes();

var app = builder.Build();

app.MapDefaultEndpoints();
app.MapGraphQL();

app.RunWithGraphQLCommands(args);
