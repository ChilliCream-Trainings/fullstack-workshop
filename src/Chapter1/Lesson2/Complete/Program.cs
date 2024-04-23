var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();

app.MapGraphQL();

app.Run();

public class Query
{
    public string SayHello(string name = "World")
        => $"Hello {name}";
}