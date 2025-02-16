import { Suspense } from "react";
import Investments from "./investments";
import { RevenueChartSkeleton } from "../ui/skeletons";
import "./dashboard.css";
import Networth from "./networth";
import Profile from "./profile";
import RecentActivity from "./recentactivity";

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
        <div className="investments-summary-container"> Investments</div>
      </div>
      {/* TODO: move this out eventually */}
      {/* <Suspense fallback={<RevenueChartSkeleton />}>
        <Investments />
      </Suspense> */}
    </div>
  );
}
