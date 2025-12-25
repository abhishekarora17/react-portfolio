import type { ReactNode } from "react";
import RightNav from "./RightNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen bg-bg flex">
      <RightNav />
      <main className="w-full px-12 md:px-24">{children}</main>
    </div>
  );
}
