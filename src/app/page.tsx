import Dashboard from "./dashboard/page";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "./skeletons";

export default async function Home() {
  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
