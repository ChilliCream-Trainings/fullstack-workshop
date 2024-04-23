# Relay Store

## Introduction
In the last chapter, we have had a look at how pagination works in Relay. In this lesson, we will have a quick look behind the scenes and see how Relay manages the data it fetches.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the core concepts of the Relay store.
- Identify and debug issues related to the store.

## Preparation
Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter7/Lesson1/Begin` folder.

Run `npm install` in the `src/Chapter7/Lesson2/Begin/` folder to install the necessary packages.

## Recap

:::info[Solutions from the last lesson]

1. -
1. -
1. To page through a connection, the parent component must be refetchable. Which mean that the parent component must either be a `Query` type or a type that implements the `Node` interface.
1. -

:::

Since the beginning of this workshop, we have just been using the hooks provided by Relay to fetch data. But to understand certain behaviors of Relay, it is important to understand how Relay manages the data it fetches.

## The Relay Store
Relay uses a sophisticated client-side data store to manage the data it fetches. 
This store, acts as a local database that caches data. By caching this data, Relay reduces the number of network requests, minimizes data fetching costs, and accelerates user interface rendering.

## Inspecting the Relay Store
To inspect the Relay store, we need to install the Relay Devtools. You can install the Relay Devtools in chromw [from the store](https://chromewebstore.google.com/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl?pli=1).

After installing the Relay Devtools, you can open the Devtools by right-clicking on the page and selecting `Inspect`. In the Devtools, you will see a new tab called `Relay`. 

Unforunately, the Relay Devtools are not a very stable experience and might crash from time to time. In this case, hard-reloading the page usually helps it recover.

At the end of this page, you will find a component called `Playground`. Copy this component into `playground.tsx` and add the component to the `Catalog` component.

## Data Normalization in the Relay Store

One of the foundational principles of the Relay store is data normalization. 
Every JSON response received from the server is broken down and normalized before being stored. 
This normalization process helps manage data consistency across the application. 
The hooks we've used, such as `useLazyLoadQuery` and `useFragment`, do not simply return data directly from the server. 
Instead, they subscribe to and retrieve data from the store, ensuring that all components receive the most current data available.

Each piece of data or record in the Relay store is assigned a globally unique identifier known as `DataId`. 
By default, this ID is derived from the record's path from the root of the query, including any arguments used. 
For types that implement an `id` field, Relay uses the value of this field as the`DataId`. 
Connections are also normalized in the store using the connection key specified in the `@connection` directive.

:::tip
**Exploring Data Normalization:**
1. Open Relay DevTools and search for the product with the ID `UHJvZHVjdAppOTk=`.
2. Click on the button corresponding to this ID to see how additional data is integrated into the existing record in the store.
:::

## Consistency and Unity: One Source of Truth

The Relay store serves as the single source of truth for the data displayed in your application. 
This unified approach ensures that data displayed in multiple components is consistent and synchronized. 
For instance, if a product identified by `UHJvZHVjdAppOTk=` appears in different parts of your application, it will display identical data everywhere.

:::tip
**Seeing Consistency in Action:**
1. Navigate to the playground and click the button with the ID `UHJvZHVjdAppOTk=`.
2. Use the `Set name to "New Name"` button and observe how the product's name updates simultaneously in both the playground and the catalog.
:::

Relay continually updates the store with new data each time you fetch from the server. If you anticipate changes in the data, simply refetching it will prompt Relay to update the store and all components subscribed to that data, maintaining consistency across your application.

## Fetch Policies
Relay tries by default to fetch data from the store. If any piece of the data, is missing, it will fetch the data from the server. This behavior is called `store-or-network`.

### Types of Fetch Policies
Relay supports several fetch policies that can be used to define how a query retrieves data: 

- `store-or-network`: (default) will reuse locally cached data, and will only send a network request if any data for the query is missing or stale. If the query is fully cached, a network request will not be made.
- `store-and-network`: will reuse locally cached data and will always send a network request, regardless of whether any data was missing or stale in the store.
- `network-only`: will not reuse locally cached data, and will always send a network request to fetch the query, ignoring any data that might be locally cached and whether it's missing or stale.
- `store-only`: will only reuse locally cached data, and will never send a network request to fetch the query. In this case, the responsibility of fetching the query falls to the caller, but this policy could also be used to read and operate on data that is entirely local.

_source: [Relay documentation](https://relay.dev/docs/guided-tour/reusing-cached-data/fetch-policies/)_

## Tasks
- Try to follow the steps outlined in this lesson to understand the Relay store.
- Filter by a brand in the catalog and try to locate the root query in the Relay Devtools
- Change the filter to something else, clear the network tab and change the filter back to the original value. Can you see a query in the network tab? Can you explain this behavior? 

## Appendix
### `<Playground />`
```tsx
import { Suspense, useState } from "react";
import { graphql, useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { playgroundQuery } from "./__generated__/playgroundQuery.graphql";

export function Playground() {
  const relay = useRelayEnvironment();
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const productIds = [
    "UHJvZHVjdAppOTk=",
    "UHJvZHVjdAppOTU=",
    "UHJvZHVjdAppODg=",
    "UHJvZHVjdAppMw==",
    "UHJvZHVjdAppMjg=",
    "UHJvZHVjdAppMTg=",
    "UHJvZHVjdAppMTc=",
    "UHJvZHVjdAppNzQ=",
    "UHJvZHVjdAppNDk=",
    "UHJvZHVjdAppNTc=",
  ];

  const updateSelectedProductName = () => {
    relay.commitUpdate((s) => {
      s.get(selectedProduct!)?.setValue("New name", "name");
    });
  };

  console.log({
    store: relay.getStore(),
    source: relay.getStore().getSource().toJSON(),
  });

  return (
    <div className="playground">
      <h3>Select one of the following ids:</h3>
      <ul>
        {productIds.map((id) => (
          <li>
            <button key={id} onClick={() => setSelectedProduct(id)}>
              {id}
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <>
          <h3>Selected item:</h3>
          <div>
            <Suspense>
              {selectedProduct && <FetchProduct id={selectedProduct} />}
            </Suspense>
            <button onClick={() => updateSelectedProductName()}>
              Set name to "New Name"
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function FetchProduct({ id }: { id: string }) {
  const data = useLazyLoadQuery<playgroundQuery>(
    graphql`
      query playgroundQuery($id: ID!) {
        productById(id: $id) {
          ... on Product {
            id
            name
            imageUrl
            availableStock
          }
        }
      }
    `,
    { id }
  );

  return (
    <ul>
      <li>{data.productById?.id}</li>
      <li>{data.productById?.name}</li>
      <li>{data.productById?.imageUrl}</li>
      <li>{data.productById?.availableStock}</li>
    </ul>
  );
}
```