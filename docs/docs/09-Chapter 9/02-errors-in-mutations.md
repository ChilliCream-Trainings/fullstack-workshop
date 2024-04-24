# Errors in Mutations

## Introduction
In the last lesson, we learned how to use mutations in Relay to update data. In this lesson, we will learn how to handle errors in mutations.

## Learning Objectives
By the end of this lesson, you will be able to:
- Handle user and system errors in mutations
- Understand the difference between user and system errors
- Know how to use the `onError` and `onCompleted` callbacks in the `useMutation` hook

## Preparation
Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter9/Lesson2/Begin` folder.

Run `npm install` in the `src/Chapter9/Lesson2/Begin/` folder to install the necessary packages.

## Recap

:::info

1. -
1. -
1. A lot of things. 

:::

Mutating data in a system always carries the risk of errors. In GraphQL, we typically encounter two types of errors:

- **User Errors**: These errors occur when the user provides incorrect input.
- **System Errors**: These errors are caused by issues in the system itself, such as database failures or network problems.

The key distinction is that user errors are within the user's control, while system errors are not. 
For example, if the database system is down, the user cannot do anything about it. 
However, if the user inputs invalid data, you can display an error message and ask them to correct it.

## User Errors

In GraphQL mutations, user errors are included in the response. 
This means you can directly select these errors in your mutation query. 
By using the `errors` field in the mutation response, you can provide visual feedback to the user when something goes wrong.

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
        errors {
          ... on QuantityCannotBeNegativeError {
            kind: __typename
          }
        }
      }
    }
```

The Relay compiler is smart in handling union types. 
It generates a type for the `errors` field that includes all selected error types, using `__typename` as the discriminator. 
Besides the predefined error types, there's also a `%other` type, which signifies the presence of additional, unspecified error types. 
Note that `%other` is never the actual value you'll receive; it's just a placeholder. 
This is important for schema evolution, allowing the server to introduce new error types without breaking existing clients.

Here’s how a typical mutation call might look:

```ts
mutate({
  variables: { productId, quantity },
  onCompleted: (res) => {
    if (res.addToBasket.errors && res.addToBasket.errors.length > 0) {
      switch (res.addToBasket.errors[0].kind) {
        case "QuantityCannotBeNegativeError":
          setIsQuantityValid(false);
          break;
        default:
          alert("Oops something went wrong. Please try again.");
          break;
      }
    } else {
      setIsQuantityValid(true);
    }
  },
});
```

:::info 

You can replace the `response` from the server with a mock response to test the `%other` case.

```json
{
    "data": {
        "addToBasket": {
            "shoppingBasket": null,
            "errors": [
                {
                    "__typename": "ProductOutOfStockError",
                    "kind": "ProductOutOfStockError",
                    "message": "The product is out of stock"
                },
                {
                    "__typename": "QuantityCannotBeNegativeError",
                    "kind": "QuantityCannotBeNegativeError",
                    "message": "QuantityCannotBeNegativeError"
                }
            ]
        }
    }
}
```

## System Errors
When a system error occurs, users typically can't resolve it themselves, but it's still important to notify them that something has gone wrong.

The `onCompleted` callback's second argument is an array of errors from the GraphQL response, which includes non-critical errors.

```json
{
  "data": {
      "addToBasket": {
          "shoppingBasket": null,
          "errors": null
      }
  },
  "errors" : [
    {
      "message": "Unepxected execution error"
    }
  ]
}
```

The `errors` listed here are not marked as `CRITICAL`. 
Critical errors, which prevent Relay from functioning properly, trigger the `onError` callback. Examples of critical errors include:

- Network issues like 503, 404, or 500 errors
- JSON parsing errors, such as when the server returns invalid JSON
- Situations where the server returns an empty `data` field

```json
{
  "errors" : [
    {
      "message": "Unepxected execution error"
    }
  ]
}
```

These critical issues are managed by the `onError` callback of the `useMutation` hook:

```ts
  onError: (err) => console.error(err) ,
```

## Tasks
1. Try to follow the steps outlined in this lesson and add error handling to the `addToBasket` mutation
1. Add error handling to the mutation in the `cart.tsx` file aswell
1. Open the network tab in the browser and slow down the network. How is the user experience if you change the quantity of a product in the basket?