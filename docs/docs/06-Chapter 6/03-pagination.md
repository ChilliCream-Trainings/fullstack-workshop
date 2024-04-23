# Pagination

## Introduction
In the last lesson, we have learned how to refetch data in a component using the `useRefetchableFragment` hook. In this lesson, we will learn how to implement pagination in our application.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand how to implement pagination in Relay using the `usePaginationFragment` hook.
- Understand how to use the `loadMore` function to fetch more data.

## Preparations

Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter6/Lesson3/Begin` folder.

Run `npm install` in the `src/Chapter6/Lesson3/Begin/` folder to install the necessary packages.


## Recap

:::info[Solutions from the last lesson]

1. -
1. No, it's not possible to refetch all fragments. Only fragments that are on the `Query` type or on a type that implements the `Node` interface can be refetched.
1. -
  1. Which variant do you prefer? The old one or the new one?

  1. While transitions can enhance user experience by smoothing out visual changes, they're not always appropriate. For instance, if a transition causes confusion or delays (like an incorrect image to text mapping), it might be more better to show a direct loading state with `<Suspense>`. 
     1. Using transitions can simplify code as they work around the need to handle the component's unmounted state. For example, a search bar filtering a list can be in the same component as the list displaying the results.

:::

In the previous lesson, we explored how to use the `useRefetchableFragment` hook for dynamically refetching data in components. Armed with this knowledge, we're now ready to tackle pagination, a fundamental feature in modern applications.

When you open the application and scroll down, you'll notice the application doesnt fetch additional data when reaching the bottom of the page. Our backend setup already supports cursor-based pagination. This system allows us to continuously fetch data by passing a cursor that points to our last fetched item back to the server. Let's find out how to implement this in our application.

## Pagination in Relay
Pagination is essential for handling large datasets by loading data incrementally, improving both user experience and performance. While we could build our own pagination mechanism, with the tools we already learned, Relay provides a standard way to implement pagination.

Relay supports an advanced form of pagination known as cursor-based pagination, which is more efficient than traditional offset-based methods. To leverage this feature, our GraphQL server needs to adhere to the [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm), which is supported by Hot Chocolate by default. Here are the key concepts:

1. **Edges Contain Data:**
   Each edge in a connection can store additional information. For example, in a connection between a user and a group, the edge might include the date the user joined the group.

2. **List Properties:**
   The connection list provides metadata, such as whether more items can be fetched (i.e., if there is a next page).

3. **Cursor-Based Mechanism:**
   The server returns an opaque cursor with each item, which the client can use to request subsequent data segments. This method typically offers performance advantages over offset-based pagination.

Let's see how we can apply these concepts to fetch a list of groups a user belongs to, using a GraphQL query with pagination arguments (this query will not work on our server, but it serves as an example):

```graphql
query groupsOfUsers($id: ID!, $first: Int, $after: String){
  user(id: $id){
    groups(first: $first, after: $after){
      edges {
        cursor
        memberSince 
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```

## Implementing Pagination with `usePaginationFragment` and `@connection`

### Transitioning from `useRefetchableFragment` to `usePaginationFragment`
In this part of the workshop, we will improve the `<Products />` component by implementing pagination. We will transition from using the `useRefetchableFragment` hook to the `usePaginationFragment` hook. 

Although the parameters remain the same between these hooks, a template and a ref, the return values and functionality differ, focusing on handling paginated data.

### Understanding `usePaginationFragment`
The `usePaginationFragment` hook returns an object containing several properties designed to manage pagination:

- **`data`**: Contains the fragment data, similar to the first value returned by `useRefetchableFragment`.
- **`refetch`**: The function to refetch the data, akin to the second value returned by `useRefetchableFragment`.
- **`isLoadingNext` / `isLoadingPrevious`**: Boolean values indicating if the next or previous pages are currently loading.
- **`loadNext` / `loadPrevious`**: Functions to load the next or previous pages.
- **`hasNext` / `hasPrevious`**: Boolean values that show whether more pages are available ahead or behind.

To make a fragment a valid pagination fragment, we need to add the `@connection` directive to the field that represents the connection. This directive helps Relay identifying the connection inside the fragment. Each connection has a unique key. This key is used to identify the connection in store updates (which we cover later).

Instead of directly selecting `nodes`, our queries now need to select `edges` and then extract `node` from these edges. We need to page over `edges`, as they contain the cursor information required for pagination.

After making these changes, run the Relay compiler:
```bash
npm run relay
```

Check the generated TypeScript file in your project. You will notice additional fields and types that Relay requires to do pagination, such as `pageInfo` and `cursor`

## Paging Through the Data

### Traditional vs. Cursor-Based Pagination

**Traditional Pagination:**
In traditional pagination, a specific number of items are displayed per page. Navigation controls, such as links to the next and previous pages, allow users to move through pages. Each click triggers the server to fetch and display a new set of items based on the page number.

**Cursor-Based Pagination:**
Cursor-based pagination differs by using a cursor, which is essentially a pointer to the next batch of items. This method does not require knowledge of the total number of pages or the current page number. The server returns a cursor along with the items, and the client uses this cursor to fetch subsequent sets of items. This approach simplifies the pagination model by eliminating the need for page numbers.

### Implementation in Relay
To navigate through data in our `<Products />` component, we'll implement a "Load More" button. Once added, try to page through the products and observe the behavior.

If this feels a bit clunky, we hear you! This button is effective in scenarios where it's uncertain if users need to see more data, such as the filters for brands where pre-fetching all data isn't efficient. It could very well be that the user never needs to see more than the first few brands.

In the catalog, however, there are better ways to handle pagination as we know when the user wants more data - when they arrive at the bottom of the page. We can improve the user experience by loading data as the user scrolls. As the user reaches the bottom of the page, we will automatically fetch the next set of products. 

There is already a helper function in the `utils` folder, called `useLoadMore`. This hook leverages the intersection observer API to detect when the "Load More" button enters the viewport. Upon detection, it triggers the `loadMore` function automatically, fetching the next set of items without additional user input.


## Tasks

1. Follow the steps above to implement pagination in the `<Products />` component.
1. After integrating pagination, verify that the brand and type filters still operate correctly. Think about how the queries could look like and then observe and analyze the GraphQL requests in the network tab.
1. Think about nested pagination. For example, a list of products that contain a list of reviews. How would you implement pagination in this scenario? What are the constraints?
1. In the list of brands and types in the filters, we currently only fetch the first items. Implement pagination for these lists as well. 
