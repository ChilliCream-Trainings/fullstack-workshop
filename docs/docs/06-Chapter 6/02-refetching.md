# Refetching data

## Introduction
In the last chapter we learned how the core mechanics of Relay work. We learned how to fetch data, how to use fragments and how to use variables in our queries. In this chapter we will go into more advanced topics and we will start in this lesson with refetching data.

## Learning Objectives
By the end of this lesson, you will be able to:
- Refetch data in a component using the `useRefetchableFragment` hook.
- Understand how to use refetching to improve the performance of your application

## Preparations

Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter6/Lesson2/Begin` folder.

Run `npm install` in the `src/Chapter6/Lesson2/Begin/` folder to install the necessary packages.


## Recap

:::info[Solutions from the last lesson]

1. -
1. - 
1. yes, it could be that the server cannot reply to after we change the brand. You can add a error boundary to display the error state.
1. - 

:::

In the last lesson we improved the user experience by adding loading and error states to our application. 
If you have watched the network tab closely, you might have noticed that, every time we change the brand, the data for the filters is also requested. 
As we have learned in the last chapters, queries in Relay are static and cannot be changed at runtime. 
As we currenlty only define the query that fetches the products and the filters, it is not possible to fetch the data optimally. 

## Refetching data
Relay offers a way to refetch data for a component, without having to re-fetch the entire query.

First, we need to remove the variables from the query in the `catalog.tsx` and move them to the `Products` component, as the `brandId` and `typeId` are filters which only concern this component.

Next, we need to change the `useFragment` hook to a `useRefetchableFragment` hook. This hook has the same signature as the `useFragment` hook, except that it returns tuple with the fragment data and a refetch function.

We also need to add a `@refetchable` directive to the query in the `catalog.tsx` and define a `queryName` for the refetch query. This query will be used when we call `refetch`.

```ts
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment catalog_query on Query
      @refetchable(queryName: "catalogQueryRefetchQuery")
      @argumentDefinitions(
        brandId: { type: "[ID!]", defaultValue: null }
        typeId: { type: "[ID!]", defaultValue: null }
      ) {
        products(
          where: { brandId: { in: $brandId }, typeId: { in: $typeId } }
        ) {
          nodes {
            ...catalogListItem_product
          }
        }
      }
    `,
    props.$ref
  );
```

The relay compiler now generates two queries for us. The query we defined in the `catalog.tsx` and a refetch query.

Now we can call the `refetch` function in the `Products` component when the brand or type changes.

```ts
  useEffect(() => {
    refetch({ brandId, typeId });
  }, [brandId, typeId]);
```

When we now change the brand or type, only the data for the `Products` component is refetched and not the entire query.

## Advanced Transitions
Every time we change the filters and the new data is fetched, the old data is removed from the screen until the new data arrives. 
Displaying the old data, while the new data is fetched, is a commen pattern in the web. Search bars, for example, often display the old search results while the new search results are fetched.

React has solved this problem with the `useTransition` hook. This hook allows you to transition between two states, without unmounting the old state during the transition.

Together with the refetching, we can now easily make use of this pattern.

```tsx
function Products({ $ref, typeId, brandId }: ProductsProps) {
  // With useTransition we can start a transition between two states
  // isRefetching is true during the transition
  const [isRefetching, startTransition] = useTransition();

  const [data, refetch] = useRefetchableFragment( /* ... */);

  useEffect(() => {
    // we wrap the refetch in a transition
    startTransition(() => {
      refetch({
        brandId: brandId ? [brandId] : undefined,
        typeId: typeId ? [typeId] : undefined,
      });
    });
  }, [brandId, typeId]);

  // we add a loading indicator to the component that is displayed during the transition
  return (
    <div className="catalog-items">
      <LoadingIndicator isLoading={isRefetching} />
      {data.products?.nodes?.map((product) => (
        <CatalogListItem $ref={product} />
      ))}
    </div>
  );
}
```

## Tasks

1. Follow the steps outlined in this lesson to refactor the `Products` component to use the `useRefetchableFragment` hook.
1. Is it possible to refetch every fragment? Or are there some limitations?
2. Slow down the network in the browser and observe the transition between the old and new data when changing the brand or type.
   1. Which variant do you prefer? The old one or the new one?
   1. Can you think of cases where the old variant is better than the new one and vice versa?