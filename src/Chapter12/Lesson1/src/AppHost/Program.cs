var builder = DistributedApplication.CreateBuilder(args);

// resources
var redis = builder
    .AddRedis("redis");

var postgres = builder
    .AddPostgres("postgres")
    .WithPgAdmin()
    .WithAnnotation(
        new ContainerImageAnnotation
        {
            Image = "ankane/pgvector",
            Tag = "latest",
        });

var rabbitMq = builder
    .AddRabbitMQ("event-bus")
    .WithHttpEndpoint(targetPort: 15672, name: "management")
    .WithAnnotation(
        new ContainerImageAnnotation
        {
            Image = "rabbitmq",
            Tag = "3.13-management",
        });

var catalogDb = postgres.AddDatabase("CatalogDB");
var identityDb = postgres.AddDatabase("IdentityDB");
var orderingDb = postgres.AddDatabase("OrderingDB");

// APIs
var identityApi = builder
    .AddProject<Projects.eShop_Identity_API>("identity-api", "https")
    .WithReference(identityDb)
    .WithReference(rabbitMq);

var identityHttps = identityApi.GetEndpoint("https");

var catalogApi = builder
    .AddProject<Projects.eShop_Catalog_API>("catalog-api")
    .WithReference(catalogDb)
    .WithEnvironment("Identity__Url", identityHttps);

var basketApi = builder
    .AddProject<Projects.eShop_Basket_API>("basket-api")
    .WithReference(redis)
    .WithEnvironment("Identity__Url", identityHttps)
    .WithReference(catalogApi.GetEndpoint("http"));

var orderingApi = builder
    .AddProject<Projects.eShop_Ordering_API>("ordering-api")
    .WithReference(rabbitMq)
    .WithReference(orderingDb)
    .WithReference(catalogApi.GetEndpoint("http"))
    .WithEnvironment("Identity__Url", identityHttps);

builder
    .AddProject<Projects.eShop_Ordering_Processor>("ordering-processor")
    .WithReference(rabbitMq)
    .WithReference(orderingDb)
    .WithEnvironment("Identity__Url", identityHttps);

var chatApi = builder
    .AddProject<Projects.eShop_Chat_API>("chat-api")
    .WithEnvironment("Identity__Url", identityHttps);

// Fusion
var gateway = builder
    .AddFusionGateway<Projects.eShop_Gateway>("gateway")
    .WithSubgraph(basketApi)
    .WithSubgraph(identityApi)
    .WithSubgraph(catalogApi)
    .WithSubgraph(orderingApi)
    .WithSubgraph(chatApi)
    .WithEnvironment("Identity__Url", identityHttps);

var bff = builder
    .AddProject<Projects.eShop_Bff>("bff", "https")
    .WithReference(gateway.GetEndpoint("http"))
    .WithEnvironment("Identity__Url", identityHttps);

identityApi
    .WithEnvironment("WebAppClient", bff.GetEndpoint("https"));

builder.Build().Compose().Run();
