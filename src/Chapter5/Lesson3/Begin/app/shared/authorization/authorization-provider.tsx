interface AuthorizationProviderProps {
  children: React.ReactNode;
}

export function useUserInfo() {
  return { userName: "Kurt" };
}

export function useSessionId() {
  return { sessionId: "1234" };
}

export function AuthorizationProvider({
  children,
}: AuthorizationProviderProps) {
  return <>{children}</>;
}
