import { Suspense } from "react";
import HeaderBar from "../components/structural/header-bar";
import FooterBar from "../components/structural/footer-bar";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "../shared/utils/error-boundary";
import { AuthorizationProvider } from "../shared/authorization/authorization-provider";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import { environment } from "../components/providers/relay-provider";
import { layoutQuery } from "./__generated__/layoutQuery.graphql";

interface LayoutProps {
  big?: boolean;
}

const query = graphql`
  query layoutQuery {
    viewer {
      ...headerBar_viewer
      ...authorizationProvider_viewer
    }
  }
`;

const preloadedQuery = loadQuery<layoutQuery>(environment, query, {});

export default function Layout({ big }: LayoutProps) {
  const data = usePreloadedQuery(query, preloadedQuery);

  return (
    <AuthorizationProvider $ref={data.viewer}>
      <HeaderBar big={big} $ref={data.viewer} />
      <Suspense>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
      <FooterBar />
    </AuthorizationProvider>
  );
}
