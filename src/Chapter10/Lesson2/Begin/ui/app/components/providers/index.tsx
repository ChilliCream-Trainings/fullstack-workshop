import { AuthorizationProvider } from "@/app/shared/authorization/authorization-provider";
import { RelayProvider } from "./relay-provider";
import { Suspense } from "react";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <RelayProvider>
      <Suspense>{children}</Suspense>
    </RelayProvider>
  );
}
