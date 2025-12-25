import type { ReactNode } from "react";
import RightNav from "./RightNav";
// import CodeCursorTrail from "../sections/CodeCursorTrail";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="relative min-h-screen bg-bg">
      {/* Code-style mouse trail */}
      {/* <CodeCursorTrail /> */}

      {/* Right-side navigation */}
      <RightNav />

      {/* Main content */}
      <main className="w-full">{children}</main>
    </div>
  );
}
