import {
  AuthorizeView,
  Authorized,
  NotAuthorized,
} from "@/app/shared/authorization";

import "./user-menu.css";
import { Link } from "react-router-dom";
import { graphql, useFragment } from "react-relay";
import { userMenu_userInfo$key } from "./__generated__/userMenu_userInfo.graphql";

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
  const data = useFragment<userMenu_userInfo$key>(
    graphql`
      fragment userMenu_userInfo on Viewer {
        username
      }
    `,
    null
  );

  return (
    <>
      <h3>{data?.username}</h3>
      <div className="dropdown-menu">
        <span className="dropdown-button">
          <img role="presentation" src="/icons/user.svg" />
        </span>
        <div className="dropdown-content">
          <Link className="dropdown-item" to="/orders">
            My orders
          </Link>
          <a className="dropdown-item" href="/">
            Log out
          </a>
        </div>
      </div>
    </>
  );
}
