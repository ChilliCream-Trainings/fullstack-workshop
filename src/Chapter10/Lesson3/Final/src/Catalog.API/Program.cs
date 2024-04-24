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

builder.Services
    .AddSingleton<ImageStorage>();

builder.Services
    .AddGraphQLServer()
    .AddCatalogTypes()
    .AddGraphQLConventions()
    .AddBananaCakePopServices(x =>
    {
        x.ApiId = "QXBpCmcwMThkMmQxOWZlM2U0MjI5YTMwN2FkOWY1ZGExNDIyNw==";
        x.ApiKey = "5XyrIjWYqUil1bkV7bTDtDyrrKzjZq642Jlc16jznq08nw4vz0YMKNOlcPcwoH51";
        x.Stage = "dev";
    })
    .UseOnlyPersistedQueriesAllowed()
    .UsePersistedQueryPipeline();

var app = builder.Build();

app.MapGraphQL();

app.MapProductApi();

app.RunWithGraphQLCommands(args);