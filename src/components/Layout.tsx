import type { ReactNode } from "react";
import TopNav from "./TopNav";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="relative min-h-screen bg-bg">
      {/* Code-style mouse trail */}
      {/* <CodeCursorTrail /> */}

      {/* Right-side navigation */}
      <TopNav />

      {/* Main content */}
      <main className="w-full">{children}</main>
    </div>
  );
}
