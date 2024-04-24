import "./add-to-basket-button.css";
import { useCallback, useState } from "react";

export function AddToBasketButton({
  productId,
  text,
}: {
  productId: string;
  text?: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const addProductToBasket = useCallback(
    () => console.log("Add product to basket"),
    [productId, quantity]
  );
  text = text || "Add to shopping bag";

  return (
    <div className="add-to-basket-button">
      <input
        className={isQuantityValid ? "" : "error"}
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button type="submit" title="Add to basket" onClick={addProductToBasket}>
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
