import { CartCatalogItemQuantity } from "./cart-catalog-item-quantity";
import "./cart-items.css";

export function CartItems() {
  return (
    <div className="cart-items">
      <div className="cart-item-header">
        <div className="catalog-item-info">Products</div>
        <div className="catalog-item-quantity">Quantity</div>
        <div className="catalog-item-total">Total</div>
      </div>
      <div className="cart-item">
        <CartCatalogItemInfo
          price={100}
          imageUrl="https://via.placeholder.com/400"
          productName="Example"
        />
        <CartCatalogItemQuantity quantity={1} />
        <CartCatalogItemTotal price={100} quantity={1} />
      </div>
      <div className="cart-item">
        <CartCatalogItemInfo
          price={50}
          imageUrl="https://via.placeholder.com/400"
          productName="Example"
        />
        <CartCatalogItemQuantity quantity={1} />
        <CartCatalogItemTotal price={50} quantity={1} />
      </div>
    </div>
  );
}

function CartCatalogItemInfo({
  price,
  productName,
  imageUrl,
}: {
  productName: string;
  imageUrl: string;
  price: number;
}) {
  return (
    <div className="catalog-item-info">
      <img alt={productName} src={imageUrl} />
      <div className="catalog-item-content">
        <p className="name">{productName}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  );
}

function CartCatalogItemTotal({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) {
  return <div className="catalog-item-total">${price * quantity}</div>;
}
