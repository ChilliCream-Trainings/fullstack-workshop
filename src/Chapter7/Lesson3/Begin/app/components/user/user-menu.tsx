import {
  AuthorizeView,
  Authorized,
  NotAuthorized,
} from "@/app/shared/authorization";

import "./user-menu.css";
import {
  useSessionId,
  useUserInfo,
} from "@/app/shared/authorization/authorization-provider";
import { Link } from "react-router-dom";

export function UserMenu() {
  return (
    <AuthorizeView>
      <Authorized>
        <AuthorizedUserMenu />
      </Authorized>
      <NotAuthorized>
        <a aria-label="Sign in" href="/bff/login">
          <img role="presentation" src="/icons/user.svg" />
        </a>
      </NotAuthorized>
    </AuthorizeView>
  );
}

export function AuthorizedUserMenu() {
  const userInfo = useUserInfo();
  const sessionId = useSessionId();

  const logoutUrl = "/bff/logout?sid=" + sessionId;

  return (
    <>
      <h3>{userInfo?.userName}</h3>
      <div className="dropdown-menu">
        <span className="dropdown-button">
          <img role="presentation" src="/icons/user.svg" />
        </span>
        <div className="dropdown-content">
          <Link className="dropdown-item" to="/orders">
            My orders
          </Link>
          <a className="dropdown-item" href={logoutUrl}>
            Log out
          </a>
        </div>
      </div>
    </>
  );
}
