import { Suspense } from "react";
import Investments from "./investments";
import { RevenueChartSkeleton } from "../ui/skeletons";

export default function Dashboard() {
  return (
    <>
      <p>Welcome to the dashboard</p>
      <Suspense fallback={<RevenueChartSkeleton />}>
        <Investments />
      </Suspense>
    </>
  );
}
