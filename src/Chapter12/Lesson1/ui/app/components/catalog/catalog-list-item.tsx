import { graphql, useFragment } from "react-relay";
import { catalogListItem$key } from "./__generated__/catalogListItem.graphql";
import { Link, useNavigate } from "react-router-dom";

import "./catalog-list-item.css";
import { useCallback, useTransition } from "react";

export function CatalogListItem({ $ref }: { $ref: catalogListItem$key }) {
  const data = useFragment(
    graphql`
      fragment catalogListItem on Product {
        id
        name
        price
        imageUrl
      }
    `,
    $ref
  );
  const [, start] = useTransition();
  const navigate = useNavigate();

  const goToProduct = useCallback(() => {
    start(() => navigate(`/product/${data.id}`));
  }, []);

  return (
    <div className="catalog-item">
      <div className="catalog-product" onClick={goToProduct}>
        <span className="catalog-product-image">
          <img alt={data.name} src={data.imageUrl} />
        </span>
        <span className="catalog-product-content">
          <span className="name">{data.name}</span>
          <span className="price">{data.price}</span>
        </span>
      </div>
    </div>
  );
}
