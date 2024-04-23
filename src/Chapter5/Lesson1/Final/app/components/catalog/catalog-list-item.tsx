import { useNavigate } from "react-router-dom";
import { useCallback, useTransition } from "react";

import "./catalog-list-item.css";

interface CatalogListItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export function CatalogListItem({
  id,
  name,
  imageUrl,
  price,
}: CatalogListItem) {
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
