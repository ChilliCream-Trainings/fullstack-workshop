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

var catalogDb = postgres.AddDatabase("CatalogDB");

// APIs

builder
    .AddProject<Projects.eShop_Catalog_API>("catalog-api")
    .WithReference(catalogDb)
    .WithReference(redis);

builder.Build().Run();
