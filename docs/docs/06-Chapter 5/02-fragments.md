# Building Apps at Scale 

## Introduction
In our previous session, we explored our first GraphQL query in Relay using the `useLazyLoadQuery`
hook. This lesson will delve into improving our application's structure and fetch performance by
using one of Relay’s fundamental concepts: **Fragments**.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the concept of Data Masking 
- Use Fragments to structure your queries and components

## Preparation
Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter5/Lesson2/Begin` folder.

Run `npm install` in the `src/Chapter5/Lesson2/Begin/` folder to install the necessary packages.

## Recap

:::info[Solutions from the last lesson]

1. -
1. The relay compiler will complain that the query is not named correctly. It expects the query to be named `catalogLookupQuery`.
    `Queries in graphql tags must start with the module name ('catalog') and end with 'Query'. Got 'catalogLookup' instead.`
3. The queries we generate are static, which means they cannot be constructed dynamically at runtime. They must be static string literals and known at compile time. This approach offers several advantages, which will become evident as we progress in this workshop.
1. -

:::

We now have three instances of `useLazyLoadQuery` within our application:
- One for fetching the product catalog.
- One for fetching brands.
- One for fetching product types.

This approach has drawbacks:
- It results in multiple queries being sent to the server simultaneously, leading to inefficiency.
- It limits the backend's ability to optimize these queries.

## Rethinking Data Fetching

Relay is designed to help you to fetch all of your data requirements for an entire screen up-front in a single query. 
Currently, our application's has multiple components fetching their data independently. To align with Relay's best practices, we'll transition to a centralized query model. 

We need to create one query that fetches all the data and move this query to the `Catalog` component, as this is the shared parent component for all the other components. 

Here is a outline of what this query might look like:

```graphql
query catalogQuery {
  products {
    nodes {
      id
      name
      description
      price
    }
  }
  productTypes {
    nodes {
      id
      name
    }
  }
  brands {
    nodes {
      id
      name
    }
  }
}
```

While centralizing data fetching in the `Catalog` component optimizes data retrieval, it introduces coupling between the parent and its child components. This coupling means that adjustments in the child components could require modifications in the `Catalog` component. In React, reusability of components is a priority, such tight coupling can complicate maintenance and scalability.


#### Implications
1. **Maintenance Challenges:** Any change required by a child component affects the parent component, potentially leading to more extensive codebase adjustments.
2. **Scalability Issues:** As components are designed to be reusable across different parts of the application, the thing coupling could restricts their usability. If you change a component that is used in multiple places, you would have to change all the parent components as well

## Specifying the Data Requirements of a Component
React breaks down the UI into components, that are units of UI that can be reused. 
Through the use of props, the coupling between components is hirarchically structured. 
The parent component passes data to the child component through props.

The dilemma at the moment is:
    a. When we fetch the data in a single query, we tightly couple the components but we optimize the data fetching.
    b. When we fetch the data in multiple queries, we loosely couple the components but we do not optimize the data fetching.

Relay solves this problem by using **Fragments**.

Fragments are named snippets of GraphQL queries that can be reused in multiple queries or in multiple places in the same query. With fragments, we define the data requirements of a component and decouple the data fetching from it.

```ts
  const data = useFragment(
    graphql`
      fragment catalog_query on Query {
        products {
          nodes {
            id
            name
            description
            price
          }
        }
      }
    `,
    $ref
  );
```

The `useFragment` hook takes a fragment and a reference to the data that the fragment should be applied to. 
The reference is currently not known.

Once you have replace the `useLazyLoadQuery` with `useFragment`, run the relay compiler to generate the necessary files.

The relay compiler will generate a type called `catalog_query$key`. This is the type of the reference that you need to pass to the `useFragment` hook. Add it to the props of the `Catalog` component. 
```ts
interface ProductsProps {
  $ref: catalog_query$key;
  // other props
}
```

Once you have done this, you will see that the return value of the `useFragment` corresponds to the data that we fetched with the `useLazyLoadQuery`.

## Composing Fragments
The `useFragment` hook does not fetch any data from the server. It only specifies the data requirements of a component.

We located the place where we want to fetch the data in the `Catalog` component. Now we need to add a query to the `Catalog` component that does the data fetching. 

For this, we use the `useLazyLoadQuery` hook and we spread the fragment into the query.

```ts
  const data = useLazyLoadQuery<catalogQuery>(
    graphql`
      query catalogQuery {
        ...catalog_query
      }
    `,
    {}
  );
```

If we inspect the generated files, after running the relay compiler, we see that the `catalogQuery` contains the fragment that we defined in the `Catalog` component. 

When we inspect the generated typescript file, we also see that the `catalogQuery` does not contain the `products` field. It contains a property called ` $fragmentRefs` though and this property contains the reference to the fragment that we defined in the `Catalog` component. 

The hiding of the `products` field is called **Data Masking**. It is a core concept of Relay.

## Data Masking
With typical data fetching approaches, you define the shapes of the data you request from the backend and then use these types to ensure type safety in your application.
With this approach you quickly create implicit dependencies between your components. 
You do no longer know which component in your hierarchy, requires which data.

Relay only allows a components to access data they specifically asked for in GraphQL fragments, and nothing more. 
We will see once we add more fragments to the `Catalog` component, that the `Products` component will only have access to `products`. 
In fact, components can not even see the data requested by their children, that would break encapsulation.

## Building Hierarchical Components

Relay uses opaque identifiers to reference data requirements. 
These identitfiers are called `keys` and are passed as the second argument to the `useFragment` hook. 
With this the data requirement becomes explicit and there is no longer a break in encapsulation.

To pass the reference, we just pass the value of the property that contains the fragment. In our case, as we operate on the root query, we just pass `data` to the `$ref` property of the `catalog`

Our `Catalog` component now looks like this:
```tsx
  const data = useLazyLoadQuery<catalogQuery>(
    graphql`
      query catalogQuery {
        ...catalog_query
      }
    `,
    {}
  );

  return (
    <>
      <div className="catalog">
        <CatalogSearch
          selectedBrandId={brandId}
          selectedTypeId={typeId}
          onBrandChange={setBrandId}
          onTypeChange={setTypeId}
        />
        <div>
          <Products typeId={typeId} brandId={brandId} $ref={data} />
        </div>
      </div>
    </>
  );
```

With the power of fragments, we can now restructure our application. 
Most components in our applications that display data, should have a fragment that defines the data requirements of the component. (Except controls, like input fields, buttons, etc.)

The `CatalogListItem` currently uses `props` to pass the data into the component. We can refactor this to use a fragment as well. 

```ts 
  const data = useFragment(
    graphql`
      fragment catalogListItem_product on Product {
        id
        name
        description
        price
      }
    `,
    $ref
  );
```  

We can now use this fragment in the `catalog_query` in the `Products` component, and pass the reference to the `CatalogListItem` component.

```tsx
function Products(props: ProductsProps) {
  const data = useFragment(
    graphql`
      fragment catalog_query on Query {
        products {
          nodes {
            ...catalogListItem_product
          }
        }
      }
    `,
    props.$ref
  );

  return (
    <div className="catalog-items">
      {data.products?.nodes?.map((product) => (
        <CatalogListItem $ref={product} />
      ))}
    </div>
  );
}
``` 


## Tasks

- Follow the steps outlined in this lesson and try to use fragments to structure your queries and components.
- Remove the `useLazyLoadQuery` hooks from `Brands` and `ProductTypes` and replace them with fragments. Introduce a new fragment in `CatalogSearch` that defines the data requirements of the search component.
- Looking at fragment binding in `CatalogListItem`, what are the capabilities we just introduced to this component? Where can this componnet now be used? 