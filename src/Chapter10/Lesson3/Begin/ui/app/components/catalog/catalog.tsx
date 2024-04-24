import "./catalog.css";
import { CatalogSearch } from "./catalog-search";
import { CatalogListItem } from "./catalog-list-item";
import { Suspense, useEffect, useState, useTransition } from "react";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { catalog_query$key } from "./__generated__/catalog_query.graphql";
import { LoadingIndicator } from "@/app/shared/utils/loading-indicator";
import { useLoadMore } from "@/app/shared/utils/use-load-more";
import { catalog_products_query$key } from "./__generated__/catalog_products_query.graphql";

interface CatalogProps {
  $ref: catalog_query$key;
}

export function Catalog({ $ref }: CatalogProps) {
  const [typeId, setTypeId] = useState<string | undefined>();
  const [brandId, setBrandId] = useState<string | undefined>();

  const data = useFragment<catalog_query$key>(
    graphql`
      fragment catalog_query on Query {
        ...catalog_products_query
        ...catalogSearch_query
      }
    `,
    $ref
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
          <Suspense>
            <Products typeId={typeId} brandId={brandId} $ref={data} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

interface ProductsProps {
  $ref: catalog_products_query$key;
  typeId?: string;
  brandId?: string;
}

function Products({ $ref, typeId, brandId }: ProductsProps) {
  const [isRefetching, startTransition] = useTransition();
  const { data, refetch, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment catalog_products_query on Query
      @refetchable(queryName: "catalogQueryRefetchQuery")
      @argumentDefinitions(
        brandId: { type: "[ID!]", defaultValue: null }
        typeId: { type: "[ID!]", defaultValue: null }
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String", defaultValue: null }
      ) {
        products(
          first: $first
          after: $after
          where: { brandId: { in: $brandId }, typeId: { in: $typeId } }
        ) @connection(key: "catalog_query_products") {
          edges {
            node {
              id
              ...catalogListItem_product
            }
          }
        }
      }
    `,
    $ref
  );

  useEffect(() => {
    startTransition(() => {
      refetch({
        brandId: brandId ? [brandId] : undefined,
        typeId: typeId ? [typeId] : undefined,
      });
    });
  }, [brandId, typeId]);

  const { element } = useLoadMore(loadNext, hasNext);

  return (
    <div className="catalog-items">
      <LoadingIndicator isLoading={isRefetching} />
      {data.products?.edges?.map(({ node }) => (
        <CatalogListItem $ref={node} key={node.id} />
      ))}
      {element}
    </div>
  );
}
