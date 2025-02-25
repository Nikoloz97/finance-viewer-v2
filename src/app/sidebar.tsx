"use client";

import { useContextCheck } from "@/use-context-check";
import "./sidebar.css";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useContextCheck();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <h2 className="mt-5 mb-3">Finance Viewer</h2>
        <div className="navbar-options">
          <Link href={"/"}>Dashboard</Link>
          <Link className="navbar-disabled" aria-disabled href={"/budget"}>
            Budget
          </Link>
          <Link className="navbar-disabled" aria-disabled href={"/allocation"}>
            Allocation
          </Link>
          <Link className="navbar-disabled" aria-disabled href={"/debt"}>
            Debt
          </Link>
          <Link href={"/investments"}>Investments</Link>
          {user ? (
            <Link href={"/profile"}>Profile</Link>
          ) : (
            <Link href={"/user/login"}>Login</Link>
          )}
          <Link className="navbar-disabled" aria-disabled href={"/settings"}>
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
