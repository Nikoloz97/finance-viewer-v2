import { Suspense } from "react";
import Investments from "./investments";
import { RevenueChartSkeleton } from "../ui/skeletons";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="networth-profile-container">
        <div className="networth-container">{/* <Networth /> */}</div>
        <div className="profile-container">{/* <Profile /> */}</div>
      </div>
      <div className="recent-activity-investments-summary-container">
        {/* <RecentActivity /> */}
        <div className="investments-summary-container"> Investments</div>
      </div>
      {/* TODO: move this out eventually */}
      {/* <Suspense fallback={<RevenueChartSkeleton />}>
        <Investments />
      </Suspense> */}
    </div>
  );
}
