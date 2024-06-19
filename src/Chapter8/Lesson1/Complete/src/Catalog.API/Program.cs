using eShop.Basket.Services;
using eShop.Catalog.Sessions;
using HotChocolate.Execution;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddNpgsqlDbContext<CatalogContext>("CatalogDB");
builder.AddRedisClient("redis");

builder.Services
    .AddMigration<CatalogContext, CatalogContextSeed>();

builder.Services
    .AddScoped<BrandService>()
    .AddScoped<ProductService>()
    .AddScoped<ProductTypeService>()
    .AddSingleton<IShoppingBasketService, RedisShoppingBasketService>()
    .AddSingleton<eShop.SessionManagement.ISession, MockSession>()
    .AddSingleton<IRequestContextEnricher, SessionRequestContextEnricher>();

builder.Services.AddSingleton<ImageStorage>();

builder.Services
    .AddGraphQLServer()
    .AddCatalogTypes()
    .AddGraphQLConventions()
    .UseDefaultPipeline();

var app = builder.Build();

app.MapGraphQL();

app.MapProductApi();

app.RunWithGraphQLCommands(args);