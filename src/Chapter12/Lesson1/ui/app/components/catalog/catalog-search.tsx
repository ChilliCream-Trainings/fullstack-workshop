import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { useCallback } from "react";
import { catalogSearch_Brands$key } from "./__generated__/catalogSearch_Brands.graphql";
import { catalogSearch_ProductTypes$key } from "./__generated__/catalogSearch_ProductTypes.graphql";
import { catalogSearch$key } from "./__generated__/catalogSearch.graphql";

import "./catalog-search.css";

interface CatalogSearchProps {
  $ref: catalogSearch$key;
  onBrandChange: (id?: string) => void;
  onTypeChange: (id?: string) => void;
  selectedBrandId?: string;
  selectedTypeId?: string;
}

export function CatalogSearch({
  $ref,
  onBrandChange,
  onTypeChange,
  selectedTypeId,
  selectedBrandId,
}: CatalogSearchProps) {
  const data = useFragment(
    graphql`
      fragment catalogSearch on Query {
        ...catalogSearch_Brands
        ...catalogSearch_ProductTypes
      }
    `,
    $ref
  );

  return (
    <div className="catalog-search">
      <div className="catalog-search-header">
        <img role="presentation" src="/icons/filters.svg" />
        Filters
      </div>
      <div className="catalog-search-types">
        <Brands
          $ref={data}
          onChange={onBrandChange}
          selectedId={selectedBrandId}
        />
        <ProductTypes
          $ref={data}
          onChange={onTypeChange}
          selectedId={selectedTypeId}
        />
      </div>
    </div>
  );
}

interface BrandsProps {
  $ref: catalogSearch_Brands$key;
  onChange: (id?: string) => void;
  selectedId?: string;
}

function Brands({ $ref, onChange, selectedId }: BrandsProps) {
  const { data, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment catalogSearch_Brands on Query
      @refetchable(queryName: "catalogSearchBrandsQuery")
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      ) {
        brands(first: $count, after: $cursor)
          @connection(key: "catalogSearch_brands") {
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    `,
    $ref
  );

  const fetchMore = useCallback(() => loadNext(10), [loadNext]);

  return (
    <div className="catalog-search-group">
      <h3>Brand</h3>
      <div className="catalog-search-group-tags">
        <div
          onClick={() => onChange(undefined)}
          className={"catalog-search-tag " + (selectedId ? "" : "active")}
        >
          All
        </div>
        {data.brands?.edges?.map(({ node }) => (
          <div
            className={
              "catalog-search-tag " + (selectedId == node.id ? "active" : "")
            }
            key={node.id}
            onClick={() => onChange(node.id)}
          >
            {node.name}
          </div>
        ))}
        {hasNext && (
          <div onClick={fetchMore} className="catalog-search-tag active">
            More
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductTypesProps {
  $ref: catalogSearch_ProductTypes$key;
  onChange: (id?: string) => void;
  selectedId?: string;
}

function ProductTypes({ $ref, onChange, selectedId }: ProductTypesProps) {
  const { data, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment catalogSearch_ProductTypes on Query
      @refetchable(queryName: "catalogSearchProductTypesQuery")
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      ) {
        productTypes(first: $count, after: $cursor)
          @connection(key: "catalogSearch_productTypes") {
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    `,
    $ref
  );

  const fetchMore = useCallback(() => loadNext(10), [loadNext]);

  return (
    <div className="catalog-search-group">
      <h3>Type</h3>
      <div className="catalog-search-group-tags">
        <div
          onClick={() => onChange(undefined)}
          className={"catalog-search-tag " + (selectedId ? "" : "active")}
        >
          All
        </div>
        {data.productTypes?.edges?.map(({ node }) => (
          <div
            className={
              "catalog-search-tag " + (selectedId == node.id ? "active" : "")
            }
            key={node.id}
            onClick={() => onChange(node.id)}
          >
            {node.name}
          </div>
        ))}
      </div>
      {hasNext && (
        <div onClick={fetchMore} className="catalog-search-tag active">
          More
        </div>
      )}
    </div>
  );
}
