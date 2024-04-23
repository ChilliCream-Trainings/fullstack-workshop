import { useParams } from "react-router-dom";
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
  const product = {
    id,
    name: "Backpack",
    brand: "Outdoor Bags",
    description: "A backpack for all your outdoor adventures.",
    price: 49.99,
    imageUrl: "https://via.placeholder.com/150",
  };

  return (
    <>
      <Title title={product.name} subtitle={product.brand} />
      <ProductDetails
        id={product.id}
        brand={product.brand}
        name={product.name}
        price={product.price}
        description={product.description}
        imageUrl={product.imageUrl}
      />
    </>
  );
}

function ProductNotFound() {
  return <h1>Product not found</h1>;
}
