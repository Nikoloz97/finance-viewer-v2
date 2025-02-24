"use client";

import { UserProvider } from "@/user-context";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
