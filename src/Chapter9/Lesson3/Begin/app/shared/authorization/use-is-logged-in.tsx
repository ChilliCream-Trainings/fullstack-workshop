import { useUserInfo } from "./use-user-info";

export function useIsLoggedIn() {
  return useUserInfo() !== null;
}
