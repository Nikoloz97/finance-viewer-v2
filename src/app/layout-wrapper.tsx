"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";

// conditionally renders sidebar

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSidebarHidden = pathname === "/" || pathname === "/user/signup";

  return (
    <>
      <SidebarProvider>
        {!isSidebarHidden && <AppSidebar />}
        {!isSidebarHidden && <SidebarTrigger />}
        <div
          className={`flex-1 h-[100vh] flex justify-center items-center py-5 pr-5 ${
            isSidebarHidden ? "pl-5" : ""
          }`}
        >
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
