import { createEnvironment } from "@/app/shared/relay/relay-network";
import { RelayEnvironmentProvider } from "react-relay";

export interface RelayProviderProps {
  children: React.ReactNode;
}

export const environment = createEnvironment();

export function RelayProvider(props: RelayProviderProps) {
  return <RelayEnvironmentProvider environment={environment} {...props} />;
}
