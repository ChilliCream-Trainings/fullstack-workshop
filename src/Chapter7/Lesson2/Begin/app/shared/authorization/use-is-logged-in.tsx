import { useUserInfo } from "./authorization-provider";

export function useIsLoggedIn() {
  return useUserInfo() !== null;
}
