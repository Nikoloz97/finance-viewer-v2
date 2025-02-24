"use client";

import "./dashboard.css";
import Investments from "./investments";
import Networth from "./networth";
import Profile from "./profile";
import RecentActivity from "./recent-activity";

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
      <div className="recent-activity-investments-summary-container">
        <div className="recent-activity-container">
          <RecentActivity />
        </div>
        <div className="investments-summary-container">
          <Investments />
        </div>
      </div>
    </div>
  );
}
