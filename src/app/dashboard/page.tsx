import { Suspense } from "react";
import Investments from "./investments";
import { RevenueChartSkeleton } from "../ui/skeletons";

export default function Page() {
  return (
    // Test
    <>
      <p>I did the digital dash</p>
      <Suspense fallback={<RevenueChartSkeleton />}>
        <Investments />
      </Suspense>
    </>
  );
}
