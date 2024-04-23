# Sorting Customizations

The sorting system, like the filtering system in Hot Chocolate, allows for more flexibility for the frontend engineer. In this lesson, we will look at how we can customize the sorting system to ensure it performs well and is easy to use.

Like with filtering, there are two main components that we need to consider when customizing the sorting system. The first component is the sorting type generation, and the second component is the sorting execution.

## Sorting Type Generation

To configure the sorting type generation, we need to create a sorting input type that is used to sort data. The sorting input type is generated based on the entity type you want to sort and is handled by the `SortInputType<T>` class. This class is a generic class that takes the entity type as a type parameter.

```csharp
public sealed class ProductSortInputType : SortInputType<Product>
{
    protected override void Configure(ISortInputTypeDescriptor<Product> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(t => t.Name);
        descriptor.Field(t => t.Price);
        descriptor.Field(t => t.Brand).Type<BrandSortInputType>();
        descriptor.Field(t => t.Type).Type<ProductTypeSortInputType>();
    }
}

public sealed class BrandSortInputType : SortInputType<Brand>
{
    protected override void Configure(ISortInputTypeDescriptor<Brand> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(t => t.Name);
    }
}

public sealed class ProductTypeSortInputType : SortInputType<ProductType>
{
    protected override you.Configure(ISortInputTypeDescriptor<ProductType> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(t => t.Name);
    }
}
```

By introducing a sort input type for our `Product`, we can choose to either ignore fields we do not want to include using `descriptor.Ignore(t => t.Description);` or include fields by setting the type to bind fields explicitly with `descriptor.BindFieldsExplicitly();`. In our case, we opted for the latter to avoid accidentally exposing fields that we do not want to sort on.

It's important here to decide if it makes sense to sort by something. Sorting by a description field might not make sense in real-world scenarios.

What makes sense is to sort by things that related objects hold, like the `Brand` or `ProductType` in our case.

In the case of sorting, we do not have operations like with filtering. Fields can be sorted by ascending or descending.

Like with filtering, we need to register the sort input type with the GraphQL builder:

```csharp
services
    .AddGraphQLServer()
    ...
    .AddType<ProductSortInputType>()
    ...
```

Or you can point to a specific input on a per-field basis:

```csharp
public class Query
{
    [UseSorting<ProductSortInputType>]
    public IQueryable<Product> GetProducts(CatalogContext context)
        => context.Products;
}
```

## Tasks

1. What fields make sense to sort by from the client standpoint?
2. Are these fields indexed in the database?
