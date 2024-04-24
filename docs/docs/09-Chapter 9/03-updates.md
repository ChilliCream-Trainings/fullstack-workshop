# Optimistic Updates and Store Updates

## Introduction
In our previous lesson, we covered error handling in mutations. We've already acquired most of the tools needed to build a fully functional application. This lesson will focus on changing the behavior of the store and manually updating the store.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand how optimistic updates work
- Update the store manually

## Preparation
Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter9/Lesson3/Begin` folder.

Run `npm install` in the `src/Chapter9/Lesson3/Begin/` folder to install the necessary packages.

## Recap

:::info

1. -
1. -
1. Users have to wait for the server to respond before seeing results, with the UI remaining unresponsive until then.

:::

Waiting can frustrate users who expect immediate feedback from an application, yet servers have inherent response time limits.
To enhance user experience, we can implement optimistic updates.

An optimistic update allows the UI to display a temporary state immediately, updating again once the server responds. 

Relay enables these optimistic updates to show a temporary state and also supports persisted updates that only modify the store upon a successful server response.

## Optimistic Updates

To implement optimistic updates in Relay, we use the `optimisticUpdater` function within the `mutate` function of the `useMutation` hook.

To enhance user experience, let's make the item disappear from the basket immediately after the user clicks the remove button.

The `optimisticUpdater` function executes with two parameters: the current store and the mutation's response. The first step involves querying the store to locate the data we need to update. Specifically, to remove an item from the basket which is linked to the viewer.

The code snippet below shows how to optimistically remove an item from the basket:

```ts
const root = store.getRoot();
const viewer = root.getLinkedRecord("viewer");
const basket = viewer?.getLinkedRecord("basket");
const items = basket?.getLinkedRecords("items")!;
const index = items?.findIndex((item) => item.getValue("id") === id);
basket?.setLinkedRecords(
    items.filter((_, i) => i !== index),
    "items"
);
```

## Updatable Fragments

Accessing the store directly through the `optimisticUpdater` function can be cumbersome. 
It lacks type safety, and you must know the store's exact structure to update it correctly.

Relay offers a more efficient way to update the store using updatable fragments.

To make a fragment updatable, add the `@updatable` directive to it. Note that this type of fragment is used solely for updating data, not for displaying it.

For each update operation, create a specific fragment and include it in the query that provides data to your component. 
This method involves passing a reference to a store object to the updater, which helps Relay identify and update the necessary data within the store.

:::tip

There's a limitation to note: you cannot include the fragment in a root query or root fragment. It must always be used within a property.

Invalid: 
```graphql
fragment Product on Product {
    id
    ...ProductFragment_updatable
}

fragment ProductFragment_updatable on Product @updatable {
  id
  name
}
```

Valid:
```graphql
fragment BasketItem on BasketItem {
    product {
        ...ProductFragment_updatable
    }
}

fragment ProductFragment_updatable on Product @updatable {
  id
  name
}
```
:::

To manipulate the updatable data, use the `readUpdatableFragment` function to access the data structured according to the fragment. This data includes a mutable set. Relay handles updates by wrapping the data in a proxy object, which automatically updates the store when you make changes to the data.

```ts
const { updatableData } = store.readUpdatableFragment(...);
updatableData.quantity = quantity;
```

## Persisted Updates
Up until now, we've been updating the store optimistically. This means we update the store before the server responds, and if the server returns an error, we revert the changes.

However, it's sometimes necessary to update the store only after the mutation has successfully completed, ensuring the updates are permanent. The API for these persistent updates is similar to that for optimistic updates, but you also receive a second parameter containing the server's response data.

## Tasks 
1. Follow the steps outlined in this lesson.
2. Consider a scenario where persisted updates would be particularly beneficial.
3. Explore the `@appendNode` and `@prependNode` directives by reading the relevant sections in the [Relay documentation](https://relay.dev/docs/guided-tour/list-data/updating-connections/).