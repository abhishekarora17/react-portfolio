import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./TopNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  const { pathname } = useLocation();

  const hideTopNav = pathname === "/valentine";

  return (
    <div className="relative min-h-screen bg-bg">
      {/* Top Navigation */}
      {!hideTopNav && <TopNav />}

      {/* Main content */}
      <main className="w-full">{children}</main>
    </div>
  );
}
