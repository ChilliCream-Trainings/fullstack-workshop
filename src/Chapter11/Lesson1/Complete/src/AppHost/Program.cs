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

// APIs
var catalogApi = builder
    .AddProject<Projects.eShop_Catalog_API>("catalog-api")
    .WithReference(catalogDb);

var basketApi = builder
    .AddProject<Projects.eShop_Basket_API>("basket-api")
    .WithReference(redis);

builder
    .AddFusionGateway<Projects.eShop_Gateway>("gateway")
    .WithSubgraph(catalogApi)
    .WithSubgraph(basketApi);

builder.Build().Compose().Run();
