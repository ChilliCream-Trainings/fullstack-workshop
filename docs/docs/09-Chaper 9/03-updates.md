# Optimistic Updates and Store Updates

## Introduction
In the last lesson, we learned about error handling in mutations. We already have most tools in place to built a fully functional application. In this lesson, we will learn how to change the behavior of the store and how to update the store manually.

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
1. The user has to wait for the server to respond before they can see the result. The UI is blocked until the server responds.

:::

Waiting is annoying. Users expect instant feedback when they interact with an application, but there are physical limits to how fast a server can respond.
To improve the user experience, we can use optimistic updates.

An optimistic update is a way to update the UI before the server responds. 
The UI displays an instant intermediate state and when the server responds, the UI is updated again. 

Relay provides a way to do optimistic updates that display the intermediate state, but you can also do persisted updates that do update the store on a successful response.


## Optimistic Updates

All optimistic updates in Relay are done by using the `optimisticUpdater` function in the `mutate` function of the `useMutation` hook.

Let's improve the user experience by immediately removing an item from the basket when the user clicks the remove button. 

The `optimisticUpdater` function is called with the current store and the response of the mutation. The first parameter of the function is the store. 
We have to query the store to get to the data we want to update. In your case, we want to remove an item from the basket, which is attached to the viewer. 

The following code snippet demonstrates how to remove an item from the basket optimistically:

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

## Updatetable Fragments

Directly accessing the store through the `optimisticUpdater` function, is a bit cumbersome. 
You do not have a type safe experience and you have to know the exact structure of the store to update it.

Relay has a better way to update the store. You can use updatable fragments to update the store.

You can make a fragment updatable by adding the `@updatable` directive to the fragment. This fragment is only used to update data and not to display it. 

For each updater, you create different fragments. 





## Persisted Updates




## Tasks 
- Read about `@appendNode` and `@prependNode` in the [Relay documentation](https://relay.dev/docs/guided-tour/list-data/updating-connections/)