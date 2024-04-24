import { graphql, useFragment } from "react-relay";
import "./product-details.css";
import {
  AuthorizeView,
  Authorized,
  NotAuthorized,
} from "@/app/shared/authorization";
import { AddToBasketButton } from "./add-to-basket-button";
import { ProductAmountInBasket } from "./product-amount-in-basket";
import { productDetails_query$key } from "./__generated__/productDetails_query.graphql";
import { productDetails_product$key } from "./__generated__/productDetails_product.graphql";

interface ProductDetailsProps {
  $ref: productDetails_product$key;
  $queryRef: productDetails_query$key;
}

export function ProductDetails({ $ref, $queryRef }: ProductDetailsProps) {
  const queryData = useFragment<productDetails_query$key>(
    graphql`
      fragment productDetails_query on Query {
        viewer {
          basket {
            ...productAmountInBasket_basket
          }
        }
      }
    `,
    $queryRef
  );
  const { id, name, brand, description, price, imageUrl } = useFragment(
    graphql`
      fragment productDetails_product on Product {
        id
        name
        description
        price
        imageUrl
        brand {
          name
        }
      }
    `,
    $ref
  );

  return (
    <div className="item-details">
      <img alt={name} src={imageUrl} />
      <div className="description">
        <p>{description}</p>
        <p>
          Brand: <strong>{brand?.name}</strong>
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

        <ProductAmountInBasket $ref={queryData?.viewer.basket} productId={id} />
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
