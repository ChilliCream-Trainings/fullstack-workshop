import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { CatalogSearch } from "./catalog-search";
import { catalog$key } from "./__generated__/catalog.graphql";
import { catalog_products$key } from "./__generated__/catalog_products.graphql";
import { CatalogListItem } from "./catalog-list-item";

import "./catalog.css";
import { useLoadMore } from "@/app/shared/utils/use-load-more";
import { useEffect, useMemo, useState } from "react";
import { ProductsFilterInputTypeInput } from "./__generated__/catalogProductsQuery.graphql";

interface CatalogProps {
  $ref: catalog$key;
}

export function Catalog(props: CatalogProps) {
  const data = useFragment(
    graphql`
      fragment catalog on Query {
        ...catalog_products
        ...catalogSearch
      }
    `,
    props.$ref
  );
  const [typeId, setTypeId] = useState<string | undefined>();
  const [brandId, setBrandId] = useState<string | undefined>();

  return (
    <>
      <div className="catalog">
        <CatalogSearch
          $ref={data}
          selectedBrandId={brandId}
          selectedTypeId={typeId}
          onBrandChange={setBrandId}
          onTypeChange={setTypeId}
        />
        <div>
          <Products $ref={data} typeId={typeId} brandId={brandId} />
        </div>
      </div>
    </>
  );
}

interface ProductsProps {
  $ref: catalog_products$key;
  typeId?: string;
  brandId?: string;
}

function Products({ $ref, typeId, brandId }: ProductsProps) {
  const { data, loadNext, hasNext, refetch } = usePaginationFragment(
    graphql`
      fragment catalog_products on Query
      @refetchable(queryName: "catalogProductsQuery")
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
        where: { type: "ProductsFilterInputTypeInput", defaultValue: null }
      ) {
        products(first: $count, after: $cursor, where: $where)
          @connection(key: "catalog_products") {
          edges {
            node {
              id
              ...catalogListItem
            }
          }
        }
      }
    `,
    $ref
  );

  const where = useMemo(() => {
    let filter: ProductsFilterInputTypeInput | null = null;
    if (typeId) {
      filter = {
        typeId: { in: [typeId] },
      };
    }
    if (brandId) {
      filter ??= {};
      filter = {
        ...filter,
        brandId: { in: [brandId] },
      };
    }
    return filter;
  }, [typeId, brandId]);

  useEffect(() => {
    console.log("refetching", where);
    refetch({ where });
  }, [where]);

  const { element } = useLoadMore(loadNext, hasNext);
  return (
    <div className="catalog-items">
      {data.products?.edges?.map((x) => (
        <CatalogListItem $ref={x.node} key={x.node.id} />
      ))}
      {element}
    </div>
  );
}
