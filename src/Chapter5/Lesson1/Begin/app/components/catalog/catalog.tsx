import { CatalogSearch } from "./catalog-search";
import { CatalogListItem } from "./catalog-list-item";
import { useState } from "react";

import "./catalog.css";

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
  return (
    <div className="catalog-items">
      <CatalogListItem
        id="1"
        imageUrl="https://via.placeholder.com/400"
        name="Example"
        price={100}
      />
      <CatalogListItem
        id="2"
        imageUrl="https://via.placeholder.com/400"
        name="Example"
        price={50}
      />
      <CatalogListItem
        id="3"
        imageUrl="https://via.placeholder.com/400"
        name="Example"
        price={25}
      />
      <CatalogListItem
        id="4"
        imageUrl="https://via.placeholder.com/400"
        name="Example"
        price={100}
      />
      <CatalogListItem
        id="5"
        imageUrl="https://via.placeholder.com/400"
        name="Example"
        price={50}
      />
      <CatalogListItem
        id="6"
        imageUrl="https://via.placeholder.com/400"
        name="Example"
        price={25}
      />
    </div>
  );
}
