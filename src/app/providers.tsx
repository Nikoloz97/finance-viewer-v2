"use client";

import { UserProvider } from "@/usercontext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
