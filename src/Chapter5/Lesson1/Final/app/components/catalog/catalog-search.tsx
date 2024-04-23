import { graphql, useLazyLoadQuery } from "react-relay";
import "./catalog-search.css";
import { catalogSearchBrandsQuery } from "./__generated__/catalogSearchBrandsQuery.graphql";
import { catalogSearchProductTypesQuery } from "./__generated__/catalogSearchProductTypesQuery.graphql";

interface CatalogSearchProps {
  onBrandChange: (id?: string) => void;
  onTypeChange: (id?: string) => void;
  selectedBrandId?: string;
  selectedTypeId?: string;
}

export function CatalogSearch({
  onBrandChange,
  onTypeChange,
  selectedTypeId,
  selectedBrandId,
}: CatalogSearchProps) {
  return (
    <div className="catalog-search">
      <div className="catalog-search-header">
        <img role="presentation" src="/icons/filters.svg" />
        Filters
      </div>
      <div className="catalog-search-types">
        <Brands onChange={onBrandChange} selectedId={selectedBrandId} />
        <ProductTypes onChange={onTypeChange} selectedId={selectedTypeId} />
      </div>
    </div>
  );
}

interface BrandsProps {
  onChange: (id?: string) => void;
  selectedId?: string;
}

function Brands({ onChange, selectedId }: BrandsProps) {
  const data = useLazyLoadQuery<catalogSearchBrandsQuery>(
    graphql`
      query catalogSearchBrandsQuery {
        brands {
          nodes {
            id
            name
          }
        }
      }
    `,
    {}
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
  onChange: (id?: string) => void;
  selectedId?: string;
}

function ProductTypes({ onChange, selectedId }: ProductTypesProps) {
  const data = useLazyLoadQuery<catalogSearchProductTypesQuery>(
    graphql`
      query catalogSearchProductTypesQuery {
        productTypes {
          nodes {
            id
            name
          }
        }
      }
    `,
    {}
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
