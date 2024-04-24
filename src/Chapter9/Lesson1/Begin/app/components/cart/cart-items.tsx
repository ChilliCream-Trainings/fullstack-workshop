import "./cart-items.css";
import { graphql, useFragment } from "react-relay";
import { cartItems_viewer$key } from "./__generated__/cartItems_viewer.graphql";
import { CartCatalogItemQuantity } from "./cart-catalog-item-quantity";
import { cartItemsCatalogItemTotal_shoppingBasketItem$key } from "./__generated__/cartItemsCatalogItemTotal_shoppingBasketItem.graphql";
import { cartItemsCatalogItemInfo_shoppingBasketItem$key } from "./__generated__/cartItemsCatalogItemInfo_shoppingBasketItem.graphql";

interface CartItemsProps {
  $ref: cartItems_viewer$key;
}

export function CartItems({ $ref }: CartItemsProps) {
  const data = useFragment(
    graphql`
      fragment cartItems_viewer on Viewer {
        basket {
          items {
            id
            ...cartCatalogItemQuantity_shoppingBasketItem
            ...cartItemsCatalogItemTotal_shoppingBasketItem
            ...cartItemsCatalogItemInfo_shoppingBasketItem
          }
        }
      }
    `,
    $ref
  );

  return (
    <div className="cart-items">
      <div className="cart-item-header">
        <div className="catalog-item-info">Products</div>
        <div className="catalog-item-quantity">Quantity</div>
        <div className="catalog-item-total">Total</div>
      </div>
      {data.basket?.items.map((item) => (
        <div className="cart-item" key={item.id}>
          <CartCatalogItemInfo $ref={item} />
          <CartCatalogItemQuantity $ref={item} />
          <CartCatalogItemTotal $ref={item} />
        </div>
      ))}
    </div>
  );
}

function CartCatalogItemInfo({
  $ref,
}: {
  $ref: cartItemsCatalogItemInfo_shoppingBasketItem$key;
}) {
  const item = useFragment(
    graphql`
      fragment cartItemsCatalogItemInfo_shoppingBasketItem on ShoppingBasketItem {
        product {
          imageUrl
          name
          price
        }
      }
    `,
    $ref
  );

  return (
    <div className="catalog-item-info">
      <img alt={item.product.name} src={item.product.imageUrl} />
      <div className="catalog-item-content">
        <p className="name">{item.product.name}</p>
        <p className="price">{item.product.price}</p>
      </div>
    </div>
  );
}

function CartCatalogItemTotal({
  $ref,
}: {
  $ref: cartItemsCatalogItemTotal_shoppingBasketItem$key;
}) {
  const data = useFragment(
    graphql`
      fragment cartItemsCatalogItemTotal_shoppingBasketItem on ShoppingBasketItem {
        product {
          price
        }
        quantity
      }
    `,
    $ref
  );
  return (
    <div className="catalog-item-total">
      ${data.product.price * data.quantity}
    </div>
  );
}
