import { useContext } from "react";
import { graphql, useFragment } from "react-relay";
import { AuthorizationContext } from "./authorization-provider";

export function useUserInfo() {
  const $ref = useContext(AuthorizationContext);
  const data = useFragment(
    graphql`
      fragment useUserInfo_viewer on Viewer {
        username
      }
    `,
    $ref
  );

  return data;
}
