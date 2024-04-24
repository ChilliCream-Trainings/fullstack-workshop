import { graphql } from "react-relay";

export default graphql`
  query homeQuery {
    ...catalog_query
    ...catalogSearch_query
  }
`;
