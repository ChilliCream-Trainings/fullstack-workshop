import { useLoaderData, useParams } from "react-router-dom";
import { Title } from "../components/structural/title";
import { ProductDetails } from "../components/product/product-details";
import { usePreloadedQuery } from "react-relay";
import query from "./product-page-query";
import { productPageQuery } from "./__generated__/productPageQuery.graphql";

export default function ProductPage() {
  const { id } = useParams();

  if (!id) {
    return <ProductNotFound />;
  }

  return <Product id={id} />;
}

function Product({ id }: { id: string }) {
  const ref = useLoaderData() as any;
  const data = usePreloadedQuery<productPageQuery>(query, ref);

  const product = data.productById;
  if (!product) {
    return <ProductNotFound />;
  }
  const { brand, name } = data.productById;
  return (
    <>
      <Title title={name} subtitle={brand?.name!} />
      <ProductDetails $queryRef={data} $ref={product} />
    </>
  );
}

function ProductNotFound() {
  return <h1>Product not found</h1>;
}
