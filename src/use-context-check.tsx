"use client";

import { useContext } from "react";
import { UserContext } from "./user-context";

export function UseContextCheck() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext is undefined!");
  }
  return context;
}
