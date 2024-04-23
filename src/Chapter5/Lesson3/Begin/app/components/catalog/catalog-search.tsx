import { graphql, useFragment } from "react-relay";
import "./catalog-search.css";
import { catalogSearch_query$key } from "./__generated__/catalogSearch_query.graphql";
import { catalogSearchBrands_query$key } from "./__generated__/catalogSearchBrands_query.graphql";
import { catalogSearchProductTypes_query$key } from "./__generated__/catalogSearchProductTypes_query.graphql";

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
  const data = useFragment(
    graphql`
      fragment catalogSearchBrands_query on Query {
        brands {
          nodes {
            id
            name
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
        {data.brands?.nodes?.map(({ id, name }) => (
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
        <div className="catalog-search-tag active">More</div>
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
  const data = useFragment(
    graphql`
      fragment catalogSearchProductTypes_query on Query {
        productTypes {
          nodes {
            id
            name
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
        {data.productTypes?.nodes?.map(({ id, name }) => (
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
      <div className="catalog-search-tag active">More</div>
    </div>
  );
}
