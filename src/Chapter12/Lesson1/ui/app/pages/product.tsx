import { useParams } from "react-router-dom";
import { graphql, useLazyLoadQuery } from "react-relay";
import { productQuery } from "./__generated__/productQuery.graphql";
import { Title } from "../components/structural/title";
import { ProductDetails } from "../components/product/product-details";

export default function ProductPage() {
  const { id } = useParams();

  if (!id) {
    return <ProductNotFound />;
  }

  return <Product id={id} />;
}

function Product({ id }: { id: string }) {
  const data = useLazyLoadQuery<productQuery>(
    graphql`
      query productQuery($id: ID!) {
        ...productDetails_query
        productById(id: $id) {
          name
          brand {
            name
          }
          ...productDetails_product
        }
      }
    `,
    { id }
  );

  if (!data.productById) {
    return <ProductNotFound />;
  }

  const { brand, name } = data.productById;
  return (
    <>
      <Title title={name} subtitle={brand.name} />
      <ProductDetails $ref={data.productById} $queryRef={data} />
    </>
  );
}

function ProductNotFound() {
  return <h1>Product not found</h1>;
}
