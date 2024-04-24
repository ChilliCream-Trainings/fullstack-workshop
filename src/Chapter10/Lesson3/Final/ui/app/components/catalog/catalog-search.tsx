import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { catalogSearch_query$key } from "./__generated__/catalogSearch_query.graphql";
import { catalogSearchBrands_query$key } from "./__generated__/catalogSearchBrands_query.graphql";
import { catalogSearchProductTypes_query$key } from "./__generated__/catalogSearchProductTypes_query.graphql";
import "./catalog-search.css";

interface CatalogSearchProps {
  $ref: catalogSearch_query$key;
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
      fragment catalogSearch_query on Query {
        ...catalogSearchBrands_query
        ...catalogSearchProductTypes_query
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
          onChange={onBrandChange}
          selectedId={selectedBrandId}
          $ref={data}
        />
        <ProductTypes
          onChange={onTypeChange}
          selectedId={selectedTypeId}
          $ref={data}
        />
      </div>
    </div>
  );
}

interface BrandsProps {
  $ref: catalogSearchBrands_query$key;
  onChange: (id?: string) => void;
  selectedId?: string;
}

function Brands({ onChange, selectedId, $ref }: BrandsProps) {
  const { data, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment catalogSearchBrands_query on Query
      @refetchable(queryName: "catalogSearchBrandsRefetchQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 5 }
        after: { type: "String" }
      ) {
        brands(first: $first, after: $after)
          @connection(key: "catalogSearchBrands_query_brands") {
          edges {
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
        {data.brands?.edges?.map(({ node: { id, name } }) => (
          <div
            className={
              "catalog-search-tag " + (selectedId == id ? "active" : "")
            }
            key={id}
            onClick={() => onChange(id)}
          >
            {name}
          </div>
        ))}
        {hasNext && (
          <div
            className="catalog-search-tag active"
            onClick={() => loadNext(10)}
          >
            More
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductTypesProps {
  $ref: catalogSearchProductTypes_query$key;
  onChange: (id?: string) => void;
  selectedId?: string;
}

function ProductTypes({ $ref, onChange, selectedId }: ProductTypesProps) {
  const { data, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment catalogSearchProductTypes_query on Query
      @refetchable(queryName: "catalogSearchProductTypesRefetchQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 5 }
        after: { type: "String" }
      ) {
        productTypes(first: $first, after: $after)
          @connection(key: "catalogSearchProductTypes_query_productTypes") {
          edges {
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
        {data.productTypes?.edges?.map(({ node: { id, name } }) => (
          <div
            className={
              "catalog-search-tag " + (selectedId == id ? "active" : "")
            }
            key={id}
            onClick={() => onChange(id)}
          >
            {name}
          </div>
        ))}
      </div>
      {hasNext && (
        <div className="catalog-search-tag active" onClick={() => loadNext(10)}>
          More
        </div>
      )}
    </div>
  );
}
