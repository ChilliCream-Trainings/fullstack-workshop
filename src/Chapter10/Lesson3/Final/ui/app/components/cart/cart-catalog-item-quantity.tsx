import { useCallback, useState } from "react";
import { graphql, useFragment, useMutation } from "react-relay";
import { cartCatalogItemQuantity_shoppingBasketItem$key } from "./__generated__/cartCatalogItemQuantity_shoppingBasketItem.graphql";
import { cartCatalogItemQuantityMutation } from "./__generated__/cartCatalogItemQuantityMutation.graphql";
import { cartCatalogItemQuantityRemoveMutation } from "./__generated__/cartCatalogItemQuantityRemoveMutation.graphql";
import { cartCatalogItemQuantity_shoppingBasketItem_updateable$key } from "./__generated__/cartCatalogItemQuantity_shoppingBasketItem_updateable.graphql";

interface UpdateBasketItemButtonProps {
  $ref: cartCatalogItemQuantity_shoppingBasketItem$key &
    cartCatalogItemQuantity_shoppingBasketItem_updateable$key;
}

export function CartCatalogItemQuantity({ $ref }: UpdateBasketItemButtonProps) {
  const { quantity: initialQuantity, id } =
    useFragment<cartCatalogItemQuantity_shoppingBasketItem$key>(
      graphql`
        fragment cartCatalogItemQuantity_shoppingBasketItem on ShoppingBasketItem {
          quantity
          id
        }
      `,
      $ref
    );

  const [quantity, setQuantity] = useState(initialQuantity);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setQuantity(parseInt(e.target.value)),
    []
  );

  return (
    <div className="catalog-item-quantity">
      <input
        aria-label="product quantity"
        type="number"
        name="update-quantity"
        value={quantity}
        min="0"
        onChange={changeHandler}
      />
      <UpdateButton quantity={quantity} id={id} $ref={$ref} />
      <RemoveButton id={id} />
    </div>
  );
}

function UpdateButton({
  quantity,
  id,
  $ref,
}: {
  quantity: number;
  id: string;
  $ref: cartCatalogItemQuantity_shoppingBasketItem_updateable$key;
}) {
  const [commit, isInFlight] = useMutation<cartCatalogItemQuantityMutation>(
    graphql`
      mutation cartCatalogItemQuantityMutation($input: ChangeQuantityInput!) {
        changeQuantity(input: $input) {
          shoppingBasket {
            items {
              id
              quantity
            }
          }
          errors {
            kind: __typename
            ... on InvalidBasketItemId {
              message
            }
            ... on QuantityCannotBeNegativeError {
              message
            }
          }
        }
      }
    `
  );
  const updateQuantity = useCallback(() => {
    commit({
      variables: {
        input: {
          id,
          quantity,
        },
      },
      onError: (err) => {
        alert(
          "There was an unexpected error adding the product to the basket."
        );
        console.error(err);
      },
      onCompleted: (res, errors) => {
        if (res.changeQuantity.errors && res.changeQuantity.errors.length > 0) {
          switch (res.changeQuantity.errors[0].kind) {
            case "QuantityCannotBeNegativeError":
              alert("Quantity cannot be negative.");
              break;
            case "InvalidBasketItemId":
              alert("Your basket is out of date. Please refresh the page.");
            default:
              alert("Oops something went wrong. Please try again.");
              break;
          }
        } else if (errors) {
          alert("There was an unexpected error updating the quantity.");
        }
      },
      optimisticUpdater: (store) => {
        const { updatableData } =
          store.readUpdatableFragment<cartCatalogItemQuantity_shoppingBasketItem_updateable$key>(
            graphql`
              fragment cartCatalogItemQuantity_shoppingBasketItem_updateable on ShoppingBasketItem
              @updatable {
                quantity
              }
            `,
            $ref
          );
        updatableData.quantity = quantity;
      },
    });
  }, [id, quantity]);

  return (
    <button
      type="submit"
      className="button button-secondary"
      name="update-quantity-button"
      disabled={isInFlight}
      onClick={updateQuantity}
    >
      Update
    </button>
  );
}

function RemoveButton({ id }: { id: string }) {
  const [commit, isInFlight] =
    useMutation<cartCatalogItemQuantityRemoveMutation>(graphql`
      mutation cartCatalogItemQuantityRemoveMutation(
        $input: RemoveFromBasketInput!
      ) {
        removeFromBasket(input: $input) {
          shoppingBasket {
            items {
              id
            }
          }
          errors {
            kind: __typename
            ... on InvalidBasketItemId {
              id
            }
          }
        }
      }
    `);

  const removeItem = useCallback(() => {
    commit({
      variables: {
        input: {
          id,
        },
      },
      onError: (err) => {
        alert(
          "There was an unexpected error adding the product to the basket."
        );
        console.error(err);
      },
      onCompleted: (res, errors) => {
        if (
          res.removeFromBasket.errors &&
          res.removeFromBasket.errors.length > 0
        ) {
          switch (res.removeFromBasket.errors[0].kind) {
            case "InvalidBasketItemId":
              alert("Your basket is out of date. Please refresh the page.");
            default:
              alert("Oops something went wrong. Please try again.");
              break;
          }
        } else if (errors) {
          alert("There was an unexpected error updating the quantity.");
        }
      },
      optimisticUpdater: (store) => {
        const root = store.getRoot();
        const viewer = root.getLinkedRecord("viewer");
        const basket = viewer?.getLinkedRecord("basket");
        const items = basket?.getLinkedRecords("items")!;
        const index = items?.findIndex((item) => item.getValue("id") === id);
        basket?.setLinkedRecords(
          items.filter((_, i) => i !== index),
          "items"
        );
      },
    });
  }, [id]);

  return (
    <button
      type="submit"
      className="button button-secondary"
      name="remove-item-button"
      disabled={isInFlight}
      onClick={removeItem}
    >
      Remove
    </button>
  );
}
