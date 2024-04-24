# Client Management
## Introduction
In the previous lesson, we learned about how we can manage our schema. In this lesson, we will learn how we can manage our clients.

## Learning Objectives
By the end of this lesson, you will be able to:
- Setup a client registry
- Understand the importance of client management

## Preparation
You can continue directly from where we left off in the last lesson

## Managing Schema Evolution in GraphQL

As schemas evolve, we often face the need to deprecate or remove outdated fields. This brings up critical questions: How can we modify the schema safely? How do we know which fields are still needed?

Applications usually have various consumers, each with unique API needs and version histories due to their differing development cycles. 
For example, while a web browser client might only need to maintain one active version, mobile clients frequently require support for several versions until all users have updated.

Introducing a new schema version necessitates checking that all versions of the client software remain compatible with this updated schema. 
If this compatibility isn’t confirmed, the update should be halted. 
This task becomes more complex when handling multiple stages, as different stages may have varying versions of the client software deployed.

Despite these complexities, the right tools can make the process much simpler.

Clients like Relay enable you to manage this complexity efficiently.

## Persisted Queries in Relay 

With Relay, you can create persisted query files. 
This process includes uploading the client version and then deploying it to a stage. 
When schema modifications are made and published, the client registry can quickly detect any queries that are affected by these changes.

The relay compiler can generate persisted query files for you. 
You have to specify the `persistConfig` option in the `relay.config.js` file.

```js 
  persistConfig: {
    file: "./persisted_queries.json", // this file HAS to exist (even when it's empty)
    algorithm: "MD5" // this can be one of MD5, SHA256, SHA1
  }
```

When you run the relay compiler, it generates a `persisted_queries.json` file in the root of your project.

The last piece on the clientside that is missing is to add the `id` of the query to each request. Let's add it to the `relay-network.ts` file.

## Publishing A Client

### Step 1: Create an Client in Banana Cake Pop 
```bash
barista client create --api-id <<api-id>>
```

### Step 2: Export the Persisted Query File  
Run the following command to export the persisted query file. 
```bash
npm run relay
```

### Step 3: Upload the Client
```bash
barista client upload --client-id <<client-id>>  --tag 0.0.1 --operations-file ./persisted_queries.json
```

### Step 4: Publish the Client
```bash
barista client publish --client-id <<api-id>>  --tag 0.0.1 --stage dev
```

## Connecting the Server

The client now only send the query id to the server. The server needs to know how to resolve this query id to the actual query.

First we need to have an api key for banana cake pop:
```bash
barista api-key create --api-id <<api-id>>
```

**Make sure to copy the value after `Secret: `
So `5XyrIjWYqUil1bkV....` in the following case
```
✓ Secret: 5XyrIjWYqUil1bkV.... This secret will not be available 
```

Then we need to install the package `BananaCakePop.Services` to the server and the service defaults.

```bash
dotnet add package BananaCakePop.Services
```

Then we need to add the following code to the `Startup.cs` file.

```csharp
builder.Services
    .AddGraphQLServer()
    .AddCatalogTypes()
    .AddGraphQLConventions()
    .AddBananaCakePopServices(x =>
    {
        x.ApiId = "";
        x.ApiKey = "";
        x.Stage = "dev";
    })
    .UsePersistedQueryPipeline();
```

And that's it. Your server is now connected to the client registry and will resolve the queries based on the query id.

## Security 
Persisted queries are the cheapest way to secure your application. Most attacks are based on the query shape.

- Parser Attacks
- Complexity Attacks
- Broken Access Control

If you only allow your queries to be executed by the query id, no one will be able to send malicious queries to your server.

You can configure your server to only accept persisted queries by adding the following code to the `Startup.cs` file.

```csharp
    .UseOnlyPersistedQueriesAllowed()
    .UsePersistedQueryPipeline()
```

## Tasks
1. Follow the steps outlined in this lesson and implement the client registry in the lesson project
1. Try to create a breaking change and try to publish it? Did the client registry catch it?
