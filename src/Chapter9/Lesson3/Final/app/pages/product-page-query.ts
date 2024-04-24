import { graphql } from "react-relay";

export default graphql`
  query productPageQuery($id: ID!) {
    ...productDetails_query
    productById(id: $id) {
      name
      brand {
        name
      }
      ...productDetails_product
    }
  }
`;
