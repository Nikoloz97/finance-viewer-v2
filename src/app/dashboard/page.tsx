"use client";

import "./dashboard.css";
import Trends from "./trends";
import Networth from "./networth";
import Profile from "./profile";
import FinancialCalendar from "./financial-calendar";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="networth-profile-container">
        <div className="networth-container">
          <Networth />
        </div>
        <div className="profile-container">
          <Profile />
        </div>
      </div>
      <div className="financial-calendar-trends-container">
        <div className="financial-calendar-container">
          <FinancialCalendar />
        </div>
        <div className="trends-container">
          <Trends />
        </div>
      </div>
    </div>
  );
}
