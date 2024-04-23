import { graphql } from "react-relay";

export default graphql`
  query productPageQuery($id: ID!) {
    productById(id: $id) {
      ... on Product {
        id
        name
        description
        price
        imageUrl
        brand {
          name
        }
      }
    }
  }
`;
