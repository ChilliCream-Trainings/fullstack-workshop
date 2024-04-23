import { useLoaderData, useParams } from "react-router-dom";
import { Title } from "../components/structural/title";
import { ProductDetails } from "../components/product/product-details";
import { useLazyLoadQuery, usePreloadedQuery } from "react-relay";
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

  return (
    <>
      <Title title={product.name!} subtitle={product.brand?.name!} />
      <ProductDetails
        id={product.id!}
        brand={product.brand?.name!}
        name={product.name!}
        price={product.price}
        description={product.description!}
        imageUrl={product.imageUrl}
      />
    </>
  );
}

function ProductNotFound() {
  return <h1>Product not found</h1>;
}
