# Pagination

In the first part, we exposed the product catalog entities through GraphQL. Fetching the `products` field would return all of the elements in the table, which would not be practical for a real-world application.

Before we get started, open the lesson directory in your IDE.

```bash
code src/Chapter2/Lesson2/Begin
```

With **Hot Chocolate**, we can use the default paging middleware, which rewrites the queryable to only fetch a segment of the product table.

<img src="/img/backend/example2-part1-middleware.png" width="300" />

To use the paging middleware, annotate your `GetProducts` resolver with the `UsePagingAttribute`.

```csharp title="/Types/Query.cs"
namespace Demo.Types;

public class Query
{
    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts(CatalogContext context)
        => context.Products;
}
```

:::info

If needed, you can specify paging settings on the `UsePagingAttribute` for a specific field.

```csharp
public class Query
{
    [UsePaging(DefaultPageSize = 2, MaxPageSize = 10)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts(CatalogContext context)
        => context.Products;
}
```

Alternatively, you can set global defaults in the GraphQL configuration.

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .SetPagingOptions(new PagingOptions
    {
        DefaultPageSize = 5,
        MaxPageSize = 50,
        IncludeTotalCount = true
    });
```

Settings on the attribute will override the global defaults.

:::

## Tasks

1. Add the paging middleware to all resolvers that return a list of entities.
2. Experiment with both global and local paging settings.
3. Fetch the last two products using the `products` field.
4. When passing `2` for the `first` argument, determine the name of the second product on the third page.
