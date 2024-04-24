import "./add-to-basket-button.css";
import { graphql, useMutation } from "react-relay";
import { MouseEventHandler, useCallback, useState } from "react";
import { addToBasketButtonMutation } from "./__generated__/addToBasketButtonMutation.graphql";

export function AddToBasketButton({
  productId,
  text,
}: {
  productId: string;
  text?: string;
}) {
  const [quantity, setQuanity] = useState(1);
  const handleQuanityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuanity(parseInt(e.target.value));
  };
  const [isQuantityValid, setIsQuantityValid] = useState(true);

  const [mutate, isInFlight] = useMutation<addToBasketButtonMutation>(graphql`
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
  `);

  const addProductToBasket: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      mutate({
        variables: { productId, quantity },
      });
    },
    [productId, quantity]
  );

  text = text || "Add to shopping bag";

  return (
    <div className="add-to-basket-button">
      <input
        className={isQuantityValid ? "" : "error"}
        type="number"
        value={quantity}
        onChange={handleQuanityChange}
      />
      <button
        type="submit"
        title="Add to basket"
        disabled={isInFlight}
        onClick={addProductToBasket}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M3 6H21"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {text}
      </button>
    </div>
  );
}
