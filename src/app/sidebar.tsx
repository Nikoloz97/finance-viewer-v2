"use client";

import { useContextCheck } from "@/use-context-check";
import "./sidebar.css";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useContextCheck();

  return (
    <div className="navbar-container pt-10 pb-10">
      <div className="navbar">
        <h2 className="mt-5 mb-3">Finance Viewer</h2>
        <div className="navbar-options">
          <Link className={user ? "" : "navbar-disabled"} href={"/dashboard"}>
            Dashboard
          </Link>
          <Link className="navbar-disabled" aria-disabled href={"/expenses"}>
            Expenses
          </Link>
          <Link className="navbar-disabled" aria-disabled href={"/allocation"}>
            Allocation & Goals
          </Link>
          <Link className="navbar-disabled" aria-disabled href={"/debt"}>
            Debt
          </Link>
          <Link className={user ? "" : "navbar-disabled"} href={"/investments"}>
            Investments
          </Link>
          {user ? (
            <Link href={"/profile"}>Profile</Link>
          ) : (
            <Link href={"/"}>Login</Link>
          )}
          <Link className="navbar-disabled" aria-disabled href={"/settings"}>
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
