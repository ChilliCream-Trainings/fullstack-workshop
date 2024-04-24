import { graphql, useFragment } from "react-relay";
import { createContext } from "react";
import {
  authorizationProvider_viewer$data,
  authorizationProvider_viewer$key,
} from "./__generated__/authorizationProvider_viewer.graphql";

interface AuthorizationProviderProps {
  children: React.ReactNode;
  $ref: authorizationProvider_viewer$key;
}

export const AuthorizationContext =
  createContext<authorizationProvider_viewer$data>(null!);

export function AuthorizationProvider({
  children,
  $ref,
}: AuthorizationProviderProps) {
  const data = useFragment(
    graphql`
      fragment authorizationProvider_viewer on Viewer {
        ...useUserInfo_viewer
      }
    `,
    $ref
  );
  return (
    <AuthorizationContext.Provider value={data}>
      {children}
    </AuthorizationContext.Provider>
  );
}
