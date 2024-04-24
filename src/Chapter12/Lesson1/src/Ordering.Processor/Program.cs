var builder = WebApplication.CreateBuilder(args);

builder.AddRabbitMQEventBus("event-bus");

builder
    .AddServiceDefaults()
    .AddDefaultAuthentication()
    .AddApplicationLayer()
    .AddInfrastructureLayer();

builder.Services
    .AddOptions<BackgroundTaskOptions>()
    .BindConfiguration(nameof(BackgroundTaskOptions));

builder.Services
    .AddHostedService<GracePeriodManagerService>();

var app = builder.Build();

app.MapDefaultEndpoints();

app.Run();