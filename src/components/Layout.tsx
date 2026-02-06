import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./TopNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  const { pathname } = useLocation();

  const hideTopNav = pathname === "/valentine";
  const noMainWrapper = pathname === "/about";

  return (
    <div className="relative min-h-screen bg-bg">
      {/* Top Navigation */}
      {!hideTopNav && <TopNav />}

      {/* Page Content */}
      {noMainWrapper ? (
        children
      ) : (
        <main className={hideTopNav ? "pt-0" : "pt-16"}>
          {children}
        </main>
      )}
    </div>
  );
}
