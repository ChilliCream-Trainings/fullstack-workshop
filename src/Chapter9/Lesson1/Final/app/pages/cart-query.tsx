import { graphql } from "react-relay";

export default graphql`
  query cartQuery {
    viewer {
      ...cartItems_viewer
      ...cartSummary_viewer
    }
    ...relatedProducts_query
  }
`;
