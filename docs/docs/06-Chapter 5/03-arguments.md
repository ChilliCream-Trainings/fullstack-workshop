# Queries for Interaction

## Introduction
In the previous lesson, we learned about how we can fetch data and how we can use fragments to structure our queries and components. Yet, in a real-world application, we often need to fetch data based on a user interaction. For example, when a user selects a category or when they scroll we want to display more products. 


## Learning Objectives
By the end of this lesson, you will be able to:
- User variables in queries
- Use arguments in fragments

## Preparation
Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter5/Lesson3/Begin` folder.

Run `npm install` in the `src/Chapter5/Lesson3/Begin/` folder to install the necessary packages.

## Recap

:::info[Solutions from the last lesson]

1. -
1. - 
1. The fragment is bound to the GraphQL type `Product`. This means that we can use this component anywhere in our application where we have a access to a `Product`. We can just spread the fragment and reference the component and all the data requirement and fetching is already done. This is very helpful once your application grows as you can just interchange components deep in the hierarchy without having to worry about the data requirements. 

:::

We now have a query in `catalog.tsx` that fetches all the data we need for the catalog page. This query is static and fetches all the data upfront. Let's look at how we can use variables in our queries to filter the data we fetch.

## Query Arguments

The second parameter of the `useLazyLoadQuery` hook, contains the variables of the query. The relay compiler compiles all query variables into typings and makes this a fully typed experience.

Let's start by filtering the products by a brand. We need to add a variable to the query and pass this variable the filter condition of the products field. 

```ts 
  const data = useLazyLoadQuery<catalogQuery>(
    graphql`
      query catalogQuery($brandId: [ID!]) {
        ...catalog_query
        ...catalogSearch_query
      }
    `,
    {}
  );
```

We also add the variable to the fragment in the `<Products />` component
```graphql
    fragment catalog_query on Query {
        products(where: { brandId: { in: $brandId } }) {
            nodes {
            ...catalogListItem_product
            }
        }
    }
```

As soon as we run the relay compiler, we will see that we can now pass a `brandId` to the the second parameter of the `useLazyLoadQuery` hook.

When we run the app and select a brand in the filters on the left, we now see a query in the network tab that fetches the products for the selected brand.

Every time the parent component re-renders, the hooks evaluates if it should re-fetch the data based on the variables passed to the query. By default, the component will only re-fetch the data if the variables have changed. If we change the product type filter for example, the query will not re-fetch the data as the variables have not changed.

:::tip 

This behaviour can be changed with the third parameter of the `useLazyLoadQuery` hook. This is the configuration object for this query and it contains a property called `fetchKey`. Every time the `fetchKey` changes, the query will re-fetch the data. You can try this out by setting the `fetchKey` to the `productType` variable and the `fetchPolicy` to `network`

:::


## Fragment Arguments

At the moment, the variable `$brandId` is defined in the query and referenced in the fragment. 
While this is valid, it is not the best practice, as there are several issues with this:
  - The fragment can only be used once in the query, as the variable `$brandId` is defined in the query. You cannot have two differently filtered products lists.
  - The variable names have to match.
  - You cannot use the fragment in queries that do not have the variable `$brandId` defined


We can solve this using fragment arguments. Fragment arguments allow us to pass variables to the fragment from the query. 
We use the `@argumentDefinitions` directive to define the variables that the fragment requires.
This is a client-side directive, which means that it is not sent to the server. It is used by relay to specify that the fragment requires 

With this directive we can specify the name, the type and the default value of the variable
    
```graphql
    fragment catalog_query on Query
    @argumentDefinitions(brandId: { type: "[ID!]", defaultValue: null }) {
        products(where: { brandId: { in: $brandId } }) {
        nodes {
            ...catalogListItem_product
        }
    }
}
```

As we no longer know if the $brandId is the same as the $brandId in the query, we need to pass the variable to the fragment in the query. 

```graphql
    query catalogQuery($brandId: [ID!]) {
    ...catalog_query @arguments(brandId: $brandId)
    ...catalogSearch_query
    }
```

## Tasks

1. Follow the steps outlined in this lesson and implement the filtering of products by brand in the catalog page
2. Wire up the filter for the product type in the catalog page as well
3. What happens if you remove variables from the query. Can you still use the fragment?
4. Try to use a different variable name in the query and the fragment 
5. Every time you click a brand, the screen flickers. Can you figure out why this happens? Do you have an idea how to solve this?






