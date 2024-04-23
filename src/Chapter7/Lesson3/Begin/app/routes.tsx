import { lazy, createElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import { loadQuery } from "react-relay";
import productQuery from "./pages/product-page-query";
import { environment } from "./components/providers/relay-provider";

const Home = lazy(() => import("./pages/home"));
const ProductPage = lazy(() => import("./pages/product"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Orders = lazy(() => import("./pages/orders"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout big />,
    children: [
      {
        id: "index",
        path: "/",
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout big={false} />,
    children: [
      {
        id: "cart",
        element: <Cart />,
        path: "cart",
      },
      {
        id: "checkout",
        element: <Checkout />,
        path: "checkout",
      },
      {
        id: "orders",
        element: <Orders />,
        path: "orders",
      },
      {
        id: "product",
        element: <ProductPage />,
        path: "product/:id",
        loader: ({ params }) => {
          if (params.id) {
            return loadQuery(environment, productQuery, { id: params.id });
          }
          return null;
        },
      },
    ],
  },
]);

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}
