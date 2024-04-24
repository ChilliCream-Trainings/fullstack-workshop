import { useCallback, useState } from "react";
import { graphql, useFragment, useMutation } from "react-relay";
import { cartCatalogItemQuantityMutation } from "./__generated__/cartCatalogItemQuantityMutation.graphql";
import { cartCatalogItemQuantity_basketItem$key } from "./__generated__/cartCatalogItemQuantity_basketItem.graphql";
import { cartCatalogItemQuantity_basketItem_updateable$key } from "./__generated__/cartCatalogItemQuantity_basketItem_updateable.graphql";
import { cartCatalogItemQuantity_update_basketItem$key } from "./__generated__/cartCatalogItemQuantity_update_basketItem.graphql";
import { cartCatalogItemQuantityRemoveMutation } from "./__generated__/cartCatalogItemQuantityRemoveMutation.graphql";

interface UpdateBasketItemButtonProps {
  $ref: cartCatalogItemQuantity_basketItem$key &
    cartCatalogItemQuantity_basketItem_updateable$key;
}

export function CartCatalogItemQuantity({ $ref }: UpdateBasketItemButtonProps) {
  const { quantity: initialQuantity, id } =
    useFragment<cartCatalogItemQuantity_basketItem$key>(
      graphql`
        fragment cartCatalogItemQuantity_basketItem on BasketItem {
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
      <UpdateButton $ref={$ref} quantity={quantity} id={id} />
      <RemoveButton id={id} />
    </div>
  );
}

function UpdateButton({
  $ref,
  quantity,
  id,
}: {
  $ref: cartCatalogItemQuantity_basketItem_updateable$key;
  quantity: number;
  id: string;
}) {
  const [commit, isInFlight] = useMutation<cartCatalogItemQuantityMutation>(
    graphql`
      mutation cartCatalogItemQuantityMutation($input: ChangeQuantityInput!) {
        changeQuantity(input: $input) {
          basket {
            items {
              id
              quantity
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
      optimisticUpdater: (store) => {
        const { updatableData } =
          store.readUpdatableFragment<cartCatalogItemQuantity_basketItem_updateable$key>(
            graphql`
              fragment cartCatalogItemQuantity_basketItem_updateable on BasketItem
              @updatable {
                quantity
              }
            `,
            $ref
          );
        updatableData.quantity = quantity;
      },
    });
  }, [id, quantity, $ref]);

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
          basket {
            items {
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
      optimisticUpdater: (store) => {
        const root = store.getRoot();
        const basket = root.getLinkedRecord("basket")!;
        const items = basket.getLinkedRecords("items")!;
        const index = items.findIndex((item) => item.getValue("id") === id);
        basket.setLinkedRecords(
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
