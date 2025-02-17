import "./sidebar.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h2 className="mt-5 mb-3">Finance Viewer</h2>
        <div className="navbar-options">
          <Link href={"/"}>Dashboard</Link>
          <Link href={"/budget"}>Budget</Link>
          <Link href={"/allocation"}>Allocation</Link>
          <Link href={"/debt"}>Debt</Link>
          <Link href={"/investments"}>Investments</Link>
          {/* TODO: set this up once useContext is set up */}
          {/* {user ? (
        <Link href={"/profile"}>Profile</Link>
      ) : (
        <Link href={"user/login"}>Login</Link>
      )} */}
          <Link href={"/settings"}>Settings</Link>
        </div>
      </div>
    </div>
  );
}
