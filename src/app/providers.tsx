"use client";

import { DemoProvider } from "@/demo-context";
import { UserProvider } from "@/user-context";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <DemoProvider>{children}</DemoProvider>
    </UserProvider>
  );
}
