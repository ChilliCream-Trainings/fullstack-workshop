import { CatalogSearch } from "./catalog-search";
import { CatalogListItem } from "./catalog-list-item";
import { useState } from "react";

import "./catalog.css";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import { catalogQuery } from "./__generated__/catalogQuery.graphql";
import { catalog_query$key } from "./__generated__/catalog_query.graphql";

interface CatalogProps {}

export function Catalog(props: CatalogProps) {
  const [typeId, setTypeId] = useState<string | undefined>();
  const [brandId, setBrandId] = useState<string | undefined>();

  const data = useLazyLoadQuery<catalogQuery>(
    graphql`
      query catalogQuery {
        ...catalog_query
        ...catalogSearch_query
      }
    `,
    {}
  );

  return (
    <>
      <div className="catalog">
        <CatalogSearch
          selectedBrandId={brandId}
          selectedTypeId={typeId}
          onBrandChange={setBrandId}
          onTypeChange={setTypeId}
          $ref={data}
        />
        <div>
          <Products typeId={typeId} brandId={brandId} $ref={data} />
        </div>
      </div>
    </>
  );
}

interface ProductsProps {
  $ref: catalog_query$key;
  typeId?: string;
  brandId?: string;
}

function Products(props: ProductsProps) {
  const data = useFragment(
    graphql`
      fragment catalog_query on Query {
        products {
          nodes {
            ...catalogListItem_product
          }
        }
      }
    `,
    props.$ref
  );

  return (
    <div className="catalog-items">
      {data.products?.nodes?.map((product) => (
        <CatalogListItem $ref={product} />
      ))}
    </div>
  );
}
