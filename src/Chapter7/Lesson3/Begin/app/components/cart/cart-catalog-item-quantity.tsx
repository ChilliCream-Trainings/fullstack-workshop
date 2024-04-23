import { useCallback, useState } from "react";

interface UpdateBasketItemButtonProps {
  quantity: number;
}

export function CartCatalogItemQuantity({
  quantity: initialQuantity,
}: UpdateBasketItemButtonProps) {
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
      <UpdateButton />
      <RemoveButton />
    </div>
  );
}

function UpdateButton() {
  return (
    <button
      type="submit"
      className="button button-secondary"
      name="update-quantity-button"
    >
      Update
    </button>
  );
}

function RemoveButton() {
  return (
    <button
      type="submit"
      className="button button-secondary"
      name="remove-item-button"
    >
      Remove
    </button>
  );
}
