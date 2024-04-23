# Mutating Data with Relay

## Introduction
In the last chapter you have learned how to do mutations in GraphQL. In this chapter we will add mutation to out application.

## Learning Objectives
By the end of this lesson, you will be able to:
- Use the `useMutation` hook to perform mutations in Relay

## Preparation
Between this and the last frontend lesson, there have been quite a few changes. You are best off starting fresh with the initial setup in the `src/Chapter9/Lesson1/Begin` folder.

Run `npm install` in the `src/Chapter9/Lesson1/Begin/` folder to install the necessary packages.

## Recap

Up to now, our focus has been on fetching data in different ways. However, a real-world application also needs to update data. As you've learned from the previous chapter, mutations are used in GraphQL to update data. In this lesson, we'll explore how to use mutations in Relay.

## The `useMutation` hook 
We previously implemented an 'add to basket' functionality. To enable mutations in Relay for this feature, we use the `useMutation` hook.

The `useMutation` hook accepts a GraphQL mutation as an argument and returns a tuple with two elements. The first element is a function that triggers the mutation, and the second is a boolean indicating whether the mutation is currently being processed.

```ts
  const [mutate, isInFlight] = useMutation<addToBasketButtonMutation>(graphql`
    mutation addToBasketButtonMutation($productId: ID!, $quantity: Int!) {
      addToBasket(input: { productId: $productId, quantity: $quantity }) {
        shoppingBasket {
          id
        }
      }
    }
  `);
```

To carry out the mutation, we invoke the `mutate` function, supplying the necessary variables for the mutation.

```ts
  const addProductToBasket = useCallback(
    () => mutate({ variables: { productId, quantity } }),
    [productId]
  );
```

Once integrated into the `onClick` handler of the button, this setup allows us to add products to the basket. 
After adding a product, refresh the page to view the updated basket contents.

While the mutation is in progress, the `isInFlight` variable becomes `true`. 
It's important to disable the button during this time to prevent multiple submissions.

## Mutation vs Updates
When we send a mutation to the server, our goal is to change the data on the server and simultaneously update the data on the client. An update, on the other hand, involves modifying the data in Relay's local client-side data store.

The client can't directly manipulate the data store because mutations are high-level operations that are not transparent to the client. The logic behind a mutation resides on the server and can change at any time. However, even after a mutation, we need to update the UI as effectively as possible.

One approach is to refetch the data that might have changed after a mutation, but this is often inefficient and a waste of resources. Fortunately, in many cases, the server already informs us what has changed. We can leverage the mutation payload from the server and Relay's data normalization capabilities to update the UI.

Consider the scenario where we don’t want to reload the page to see the updated basket after adding a product. In the `addToBasket` mutation's payload, we receive the `shoppingBasket` object. By including the `shoppingBasket` object in the mutation query, Relay automatically updates the store with the new data.

Additionally, we can embed fragments from other components in the mutation query to ensure that the data they depend on is also updated:

```graphql
  mutation addToBasketButtonMutation($productId: ID!, $quantity: Int!) {
    addToBasket(input: { productId: $productId, quantity: $quantity }) {
      shoppingBasket {
        id
        items {
          id
          ...cartCatalogItemQuantity_shoppingBasketItem
          ...cartItemsCatalogItemTotal_shoppingBasketItem
          ...cartItemsCatalogItemInfo_shoppingBasketItem
        }
      }
    }
  }
```

Now, when an item is added to the basket, the UI updates automatically without any need for additional data fetching.

## Tasks
- Try to follow the steps outlined in this lesson and implement the add to basket functionality in the catalog page
- Add the mutations in the `cart.tsx` to change and remove items from the basket
- Think about, what happens if the server returns an error. What can go wrong?