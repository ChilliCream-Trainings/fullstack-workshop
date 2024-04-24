import { useIsLoggedIn } from "./use-is-logged-in";

interface NotAuthorizeProps {
  children: React.ReactNode;
}

export function NotAuthorized({ children }: NotAuthorizeProps) {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
