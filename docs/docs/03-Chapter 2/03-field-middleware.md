# Field Middleware

Field middleware is a powerful concept in **Hot Chocolate** that allows you to intercept the execution of a field resolver. This is useful for various use cases, including logging, caching, and authorization.

Before we get started, open the lesson directory in your IDE.

```bash
code src/Chapter2/Lesson3/Begin
```

The attribute `UsePagingAttribute` is a so-called `DescriptorAttribute` that wraps GraphQL fluent configuration logic, as shown in the example code below.

```csharp
/// <summary>
/// This attribute adds the cursor paging middleware to the annotated method or property.
/// </summary>
public sealed class UsePagingAttribute : DescriptorAttribute
{
    // shortened for brevity

    protected internal override void TryConfigure(
        IDescriptorContext context,
        IDescriptor descriptor,
        ICustomAttributeProvider element)
    {
        if (element is MemberInfo)
        {
            if (descriptor is IObjectFieldDescriptor ofd)
            {
                ofd.UsePaging();
            }
            else if (descriptor is IInterfaceFieldDescriptor ifd)
            {
                ifd.UsePaging();
            }
        }
    }
}
```

By annotating this attribute to your resolver, it will intercept the field descriptor and apply configuration to it. Attributes that start with the verb `Use` will apply field middleware to the field, changing the runtime behavior of the annotated resolver.

:::info

**Hot Chocolate** allows you to define your schema with three equally capable approaches:

- **annotation-based**

  The annotation-based approach uses pure C# code in combination with attributes. Most of the types in this workshop leverage this approach.

- **code-first**

  The code-first approach uses our fluent type API to declare types.

  ```csharp
  public sealed class AssetFilterInputType : FilterInputType<Asset>
  {
      protected override void Configure(IFilterInputTypeDescriptor<Asset> descriptor)
      {
          descriptor.BindFieldsExplicitly();
          descriptor.Field(t => t.Symbol);
          descriptor.Field(t => t.Slug);
          descriptor.Field(t => t.Name);
          descriptor.Field(t => t.Description);
          descriptor.Field(t => t.Website);
          descriptor.Field(t => t.Price);
      }
  }
  ```

- **schema-first**

  The schema-first approach leverages the GraphQL schema definition language to declare the schema types. The first version of **Hot Chocolate** was actually a schema-first-only server.

  ```graphql
  type Query {
    assets: [Asset!]!
  }
  ```

> Schema building approaches can be mixed and matched.

:::

For **field middleware attributes, order is important** since they will form a field resolver pipeline.

The descriptor API is open, and you can build your own descriptor attributes that you can chain into any field middleware pipeline. In middleware attributes, make sure to pass through the `order` parameter.

```csharp
public sealed class UsePagingAttribute : DescriptorAttribute
{
    // shortened for brevity
    public UsePagingAttribute([CallerLineNumber] int order = 0)
    {
        Order = order;
    }
}
```

A field middleware can be applied to an `IObjectTypeDescriptor` with the fluent API.

```csharp
public sealed class SomeType : ObjectType
{
    protected override void Configure(IObjectTypeDescriptor descriptor)
    {
        descriptor
            .Field("somefield")
            .Use(next => context =>
            {
                await next(context);

                if(context.Result is string s)
                {
                    context.Result = s.ToUpper();
                }
            })
            .Resolve(ctx => "hello");
    }
}
```

Apart from adding middleware, descriptor attributes can also package additional configuration to change the structure of an annotated field. This is, for instance, what the paging attribute does. It introduces new field arguments and changes the return type of the field.

You can find more about field middleware [here](https://chillicream.com/docs/hotchocolate/v13/execution-engine/field-middleware/).

## Tasks

1. Create a middleware that formats the brand name to uppercase.
2. Ensure that the middleware is reusable and can be applied to any field that returns a string.
3. Run a query that fetches all brands and ensures that the brand name is in uppercase.
