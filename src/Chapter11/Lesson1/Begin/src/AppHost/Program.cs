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
builder
    .AddProject<Projects.eShop_Basket_API>("basket-api")
    .WithReference(catalogDb)
    .WithReference(redis);

builder
    .AddProject<Projects.eShop_Catalog_API>("catalog-api")
    .WithReference(catalogDb)
    .WithReference(redis);

builder.Build().Run();
