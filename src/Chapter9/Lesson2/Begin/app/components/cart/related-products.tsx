import "./related-products.css";
import { useEffect, useMemo, useTransition } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { LoadingIndicator } from "@/app/shared/utils/loading-indicator";
import { relatedProducts_query$key } from "./__generated__/relatedProducts_query.graphql";
import { RelatedProductListItem } from "./related-product-list-item";

interface RelatedProductsProps {
  $ref: relatedProducts_query$key;
}

const DISPLAYED_ITEMS = 4;

export function RelatedProducts({ $ref }: RelatedProductsProps) {
  const [isRefetching, startTransition] = useTransition();
  const { data, loadNext } = usePaginationFragment(
    graphql`
      fragment relatedProducts_query on Query
      @refetchable(queryName: "relatedProductsRefetchQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 4 }
        after: { type: "String", defaultValue: null }
      ) {
        viewer {
          basket {
            items {
              id
              product {
                id
              }
            }
          }
        }
        relatedProducts: products(first: $first, after: $after)
          @connection(key: "relatedProducts_relatedProducts") {
          edges {
            node {
              id
              ...relatedProductListItem_product
            }
          }
        }
      }
    `,
    $ref
  );

  const visibleItems = useMemo(() => {
    const items =
      data.viewer.basket?.items?.map((item) => item.product?.id) ?? [];
    return (
      data.relatedProducts?.edges?.filter(
        ({ node }) => !items.includes(node.id)
      ) ?? []
    );
  }, [data.relatedProducts, data.viewer.basket?.items]);

  useEffect(() => {
    if (!isRefetching && visibleItems.length < DISPLAYED_ITEMS) {
      startTransition(() => {
        loadNext(DISPLAYED_ITEMS - visibleItems.length);
      });
    }
  }, [visibleItems.length, isRefetching]);

  const filteredItems = visibleItems.slice(0, DISPLAYED_ITEMS);

  return (
    <div className="relatedProducts">
      <h1>You may also like</h1>
      <div className="relatedProducts-items">
        <LoadingIndicator isLoading={isRefetching} />
        {filteredItems.map(({ node }) => (
          <RelatedProductListItem $ref={node} key={node.id} />
        ))}
      </div>
    </div>
  );
}
