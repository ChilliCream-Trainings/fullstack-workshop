import "./product-details.css";
import {
  AuthorizeView,
  Authorized,
  NotAuthorized,
} from "@/app/shared/authorization";
import { AddToBasketButton } from "./add-to-basket-button";
import { ProductAmountInBasket } from "./product-amount-in-basket";

interface ProductDetailsProps {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
}

export function ProductDetails({
  id,
  name,
  brand,
  description,
  price,
  imageUrl,
}: ProductDetailsProps) {
  return (
    <div className="item-details">
      <img alt={name} src={imageUrl} />
      <div className="description">
        <p>{description}</p>
        <p>
          Brand: <strong>{name}</strong>
        </p>
        <form className="add-to-cart" method="post">
          <span className="price">{price}</span>
          <AuthorizeView>
            <Authorized>
              <AddToBasketButton productId={id} />
            </Authorized>
            <NotAuthorized>
              <LoginButton />
            </NotAuthorized>
          </AuthorizeView>
        </form>

        <ProductAmountInBasket productId={id} />
      </div>
    </div>
  );
}

function LoginButton() {
  return (
    <a href="/bff/login">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Log in to purchase
    </a>
  );
}
