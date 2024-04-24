import "./related-product-list-item.css";

import { graphql, useFragment } from "react-relay";
import { relatedProductListItem_product$key } from "./__generated__/relatedProductListItem_product.graphql";
import { AddToBasketButton } from "../product/add-to-basket-button";

interface RelatedProductListItem {
  $ref: relatedProductListItem_product$key;
}

export function RelatedProductListItem({ $ref }: RelatedProductListItem) {
  const { id, name, price, imageUrl } = useFragment(
    graphql`
      fragment relatedProductListItem_product on Product {
        id
        name
        description
        price
        imageUrl
      }
    `,
    $ref
  );

  return (
    <div className="relatedProduct-item">
      <div className="relatedProduct-product">
        <span className="relatedProduct-product-image">
          <img alt={name} src={imageUrl} />
        </span>
        <span className="relatedProduct-product-content">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </span>
        <AddToBasketButton productId={id} text="Add" />
      </div>
    </div>
  );
}
