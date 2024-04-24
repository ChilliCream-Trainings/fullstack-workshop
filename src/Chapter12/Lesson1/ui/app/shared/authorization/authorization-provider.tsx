import { environment } from "@/app/components/providers/relay-provider";
import {
  graphql,
  loadQuery,
  useFragment,
  usePreloadedQuery,
} from "react-relay";
import { authorizationProviderQuery } from "./__generated__/authorizationProviderQuery.graphql";
import { authorizationProvider_useUserName$key } from "./__generated__/authorizationProvider_useUserName.graphql";
import { authorizationProvider_useSessionId$key } from "./__generated__/authorizationProvider_useSessionId.graphql";

interface AuthorizationProviderProps {
  children: React.ReactNode;
}

const document = graphql`
  query authorizationProviderQuery {
    viewer {
      ...authorizationProvider_useSessionId
      ...authorizationProvider_useUserName
    }
  }
`;

const $ref = loadQuery<authorizationProviderQuery>(environment, document, {});

export function useUserInfo() {
  const queryData = usePreloadedQuery<authorizationProviderQuery>(
    document,
    $ref
  );
  const data = useFragment<authorizationProvider_useUserName$key>(
    graphql`
      fragment authorizationProvider_useUserName on Viewer {
        user {
          userName
          id
          email
          name
          lastName
        }
      }
    `,
    queryData.viewer
  );

  return data.user;
}

export function useSessionId() {
  const queryData = usePreloadedQuery<authorizationProviderQuery>(
    document,
    $ref
  );
  const data = useFragment<authorizationProvider_useSessionId$key>(
    graphql`
      fragment authorizationProvider_useSessionId on Viewer {
        sessionId
      }
    `,
    queryData.viewer
  );

  return data.sessionId;
}

export function AuthorizationProvider({
  children,
}: AuthorizationProviderProps) {
  return <>{children}</>;
}
