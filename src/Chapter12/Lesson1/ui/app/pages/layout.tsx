import { Suspense } from "react";
import HeaderBar from "../components/structural/header-bar";
import FooterBar from "../components/structural/footer-bar";
import { Outlet } from "react-router-dom";
import { OpenChatButton } from "../components/chat/open-chat-button";

interface LayoutProps {
  big?: boolean;
}

export default function Layout({ big }: LayoutProps) {
  return (
    <Suspense>
      <HeaderBar big={big} />
      <Suspense>
        <Outlet />
      </Suspense>
      <OpenChatButton />
      <FooterBar />
    </Suspense>
  );
}
