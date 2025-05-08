"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

// conditionally renders sidebar

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  console.log(pathname);

  const isSidebarHidden = pathname === "/" || pathname === "/user/signup";

  return (
    <>
      {!isSidebarHidden && <Sidebar />}
      <div
        className={`flex-1 h-full flex justify-center items-center py-10 pr-10 ${
          isSidebarHidden ? "pl-10" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
