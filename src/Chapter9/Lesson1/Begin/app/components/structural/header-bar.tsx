import "./header-bar.css";
import { graphql, useFragment } from "react-relay";
import { CartMenu } from "../cart/cart-menu";
import { UserMenu } from "../user/user-menu";

import { Link } from "react-router-dom";
import { headerBar_viewer$key } from "./__generated__/headerBar_viewer.graphql";

interface HeaderBarProps {
  big?: boolean;
  $ref: headerBar_viewer$key;
}

export default function HeaderBar(props: HeaderBarProps) {
  const data = useFragment(
    graphql`
      fragment headerBar_viewer on Viewer {
        ...cartMenu_viewer
      }
    `,
    props.$ref
  );
  return (
    <div className={"eshop-header " + (props.big ? "home" : "")}>
      <div className="eshop-header-hero">
        {props.big ? (
          <img role="presentation" src="/images/header-home.webp" />
        ) : (
          <img role="presentation" src="/images/header.webp" />
        )}
      </div>
      <div className="eshop-header-container">
        <nav className="eshop-header-navbar">
          <Link className="logo logo-header" to="/">
            <img
              alt="Northern Mountains"
              src="/images/logo-header.svg"
              className="logo logo-header"
            />
          </Link>
          <UserMenu />
          <CartMenu $ref={data} />
        </nav>
      </div>
    </div>
  );
}
