import { Suspense } from "react";

interface AuthorizeViewProps {
  children: React.ReactNode;
}

export function AuthorizeView({ children }: AuthorizeViewProps) {
  return <Suspense>{children}</Suspense>;
}
