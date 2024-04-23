# Type Auto Registration

In the previous chapter, we discussed how to manually register types with the schema builder. This method provides full control over the types registered within the schema but can be cumbersome when dealing with numerous types.

In real-world scenarios, it is common to find lengthy chains of type registration code. Often, modularization is handled using assemblies, which utilize an extension method to register all types from an assembly. While this approach is functional, it can become difficult to maintain.

To streamline this process, Hot Chocolate introduces a feature called "type auto registration." This feature employs a source generator to create the registration code at build time, adopting the module principle to generate one type registration extension method per assembly.

To utilize type auto registration, add the `HotChocolate.Types.Analyzer` package to your project. This package automatically generates the type registration code.

```xml
<PackageReference Include="HotChocolate.Types.Analyzers" Version="14.0.0-p.93">
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    <PrivateAssets>all</PrivateAssets>
</PackageReference>
```

After installing the package, you can control the name of the module extension method using the `ModuleAttribute`. Typically, a code file named `ModuleInfo.cs` is created, where this attribute is added as metadata to the assembly.

```csharp
[assembly: Module("Types")]
```

In the example above, we named it `Types`, resulting in an extension method called `AddTypes`. This method allows you to register all types from the assembly with the GraphQL configuration builder.

```csharp
services
    .AddGraphQLServer()
    .AddTypes()
    ...
```
