import { useIsLoggedIn } from "./use-is-logged-in";

interface AuthorizeProps {
  children: React.ReactNode;
}

export function Authorized({ children }: AuthorizeProps) {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
