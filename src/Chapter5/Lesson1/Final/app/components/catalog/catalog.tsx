import { CatalogSearch } from "./catalog-search";
import { CatalogListItem } from "./catalog-list-item";
import { useState } from "react";

import "./catalog.css";
import { graphql, useLazyLoadQuery } from "react-relay";
import { catalogQuery } from "./__generated__/catalogQuery.graphql";

interface CatalogProps {}

export function Catalog(props: CatalogProps) {
  const [typeId, setTypeId] = useState<string | undefined>();
  const [brandId, setBrandId] = useState<string | undefined>();

  return (
    <>
      <div className="catalog">
        <CatalogSearch
          selectedBrandId={brandId}
          selectedTypeId={typeId}
          onBrandChange={setBrandId}
          onTypeChange={setTypeId}
        />
        <div>
          <Products typeId={typeId} brandId={brandId} />
        </div>
      </div>
    </>
  );
}

interface ProductsProps {
  typeId?: string;
  brandId?: string;
}

function Products(props: ProductsProps) {
  const data = useLazyLoadQuery<catalogQuery>(
    graphql`
      query catalogQuery {
        products {
          nodes {
            id
            name
            description
            price
          }
        }
      }
    `,
    {}
  );

  return (
    <div className="catalog-items">
      {data.products?.nodes?.map((product) => (
        <CatalogListItem
          id={product.id + ""}
          name={product.name}
          price={product.price}
          imageUrl="https://via.placeholder.com/400"
        />
      ))}
    </div>
  );
}
