"use client";

import { useContextCheck } from "@/use-context-check";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const { user } = useContextCheck();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-white mb-2 font-semibold">
            Finance Viewer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-3">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="text-xl" href={"/dashboard"}>
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className="navbar-disabled text-xl"
                    aria-disabled
                    href={"/expenses"}
                  >
                    Expenses
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className="navbar-disabled text-xl"
                    aria-disabled
                    href={"/allocation"}
                  >
                    Allocation & Goals
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className="navbar-disabled text-xl"
                    aria-disabled
                    href={"/debt"}
                  >
                    Debt
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="text-xl" href={"/investments"}>
                    Investments
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  {user ? (
                    <Link className="text-xl" href={"/profile"}>
                      Profile
                    </Link>
                  ) : (
                    <Link className="text-xl" href={"/"}>
                      Login
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="text-xl" aria-disabled href={"/settings"}>
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
