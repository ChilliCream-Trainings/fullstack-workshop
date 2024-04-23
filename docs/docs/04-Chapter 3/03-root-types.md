# Root Type Splitting

In GraphQL, we have root types that represent certain operations. GraphQL defines three root types: `Query`, `Mutation`, and `Subscription`. These root types are the entry points for the GraphQL schema.

Since these root types can grow in complexity, it is a good idea to split them into multiple classes without introducing nesting in our GraphQL schema.

For this, **Hot Chocolate** allows you to split these root types into multiple classes. Let's take a look at how we can split the `Query` root type into multiple classes.

## Splitting the Query Root Type

In order to split the query type into multiple classes, we simply create one or more classes and annotate them with the `QueryTypeAttribute`.

```csharp
[QueryType]
public class Query1
{
    public string GetHello1() => "Hello from Query1!";
}

[QueryType]
public class Query2
{
    public string GetHello2() => "Hello from Query2!";
}
```

The above code will result in a schema that looks like this:

```graphql
type Query {
  hello1: String!
  hello2: String!
}
```

Splitting the root types in this way allows us to maintain separation of concerns in our codebase and makes it easier to manage. You can split a root type even across assemblies. Hot Chocolate will automatically discover these classes and merge them into a single root type for the GraphQL schema.

:::note

The classes can be static or instance classes.

:::

The type auto-registration feature will automatically register these classes with the schema.
