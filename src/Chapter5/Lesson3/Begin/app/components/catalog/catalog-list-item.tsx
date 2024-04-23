import { useNavigate } from "react-router-dom";
import { useCallback, useTransition } from "react";
import { graphql, useFragment } from "react-relay";
import { catalogListItem_product$key } from "./__generated__/catalogListItem_product.graphql";

import "./catalog-list-item.css";

interface CatalogListItem {
  $ref: catalogListItem_product$key;
}

export function CatalogListItem({ $ref }: CatalogListItem) {
  const { id, name, price, imageUrl } = useFragment(
    graphql`
      fragment catalogListItem_product on Product {
        id
        name
        description
        price
        imageUrl
      }
    `,
    $ref
  );

  const [, start] = useTransition();
  const navigate = useNavigate();

  const goToProduct = useCallback(() => {
    start(() => navigate(`/product/${id}`));
  }, []);

  return (
    <div className="catalog-item">
      <div className="catalog-product" onClick={goToProduct}>
        <span className="catalog-product-image">
          <img alt={name} src={imageUrl} />
        </span>
        <span className="catalog-product-content">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </span>
      </div>
    </div>
  );
}
