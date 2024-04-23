# Hot Chocolate Data

In this chapter, we will begin building our webshop API. We will start with a basic GraphQL server that exposes a `Brand`, a `Product`, and a `ProductType` entity to enable the webshop to fetch available products. This API represents the product catalog.

In this chapter, we will cover the following topics:

- Basic Dependency Injection (DI) integration with resolvers.
- Exposing lists of entities from a database.
- Cursor-based pagination.
- Filtering, sorting, and projecting data.

## Preparations

Open the lesson directory in your IDE.

```bash
code src/Chapter2/Lesson1/Begin
```

In our example, we already have a basic GraphQL server set up with **Hot Chocolate** that exposes the `Brand` entity through the GraphQL `Query` type. We also have all the entities and the database context already set up.

:::note
The `Query` class will represent the GraphQL root type for query operations. Query operations in GraphQL represent side-effect-free read operations.
:::

Before we can test this server, we need to set up our database server. For this workshop, we will use PostgreSQL. We have prepared a docker-compose file for you, located in the `src/Chapter2/Lesson1/Begin` directory.

```bash
docker-compose up -d
```

This will start a PostgreSQL database server on your local machine. The server will be available at `localhost:5432`. We have also set up pgAdmin for you, so you can inspect the database. The pgAdmin server will be available at `localhost:5050`. The username and password can be found in the docker-compose file.

## Tasks

1. Start the GraphQL server and explore the schema in Banana Cake Pop.
2. Try to query the `brands` field on the `Query` type.
3. Examine the filters on the `brands` field and consider the limitations and issues they might introduce.
4. Implement a new resolver for the `products` field on the `Query` type that fetches all products from the database, allowing for filtering and sorting of the dataset.
5. Implement a new resolver for the `productTypes` field on the `Query` type that fetches all product types from the database, allowing for filtering and sorting of the dataset.
