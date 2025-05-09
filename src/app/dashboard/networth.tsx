"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
  Investment,
  InvestmentChartConfig,
  InvestmentChartData,
  SelectedInvestment,
} from "@/lib/models/investments";
import { get } from "../utils/http-request-service";
import { useContextCheck } from "@/use-context-check";
import "./dashboard.css";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Networth() {
  const { user } = useContextCheck();

  const [investments, setInvestments] = useState<Investment[]>([]);

  const [selectedInvestment, setSelectedInvestment] =
    useState<SelectedInvestment | null>(null);

  const [areInvestmentsLoading, setAreInvestmentsLoading] = useState(true);

  const [selectedInvestmentChartConfig, setSelectedInvestmentChartConfig] =
    useState<InvestmentChartConfig>();

  const [selectedInvestmentChartData, setSelectedInvestmentChartData] =
    useState<InvestmentChartData[]>();

  const fetchInvestments = async () => {
    setAreInvestmentsLoading(true);
    const investments: Investment[] = await get(
      `/api/investments?userId=${user!._id}`,
      "Failed to fetch investments"
    );
    setInvestments(investments);
    setSelectedInvestment(null);
    const chartConfig = investments.reduce<InvestmentChartConfig>(
      (acc, investment) => {
        const { brokerageName, color } = investment;
        const joinedBrokerageName = brokerageName.replace(/\s+/g, ""); // join on whitespace
        acc[joinedBrokerageName] = {
          label: brokerageName,
          color: color,
        };
        return acc;
      },
      {}
    );

    setSelectedInvestmentChartConfig(chartConfig);
    setAreInvestmentsLoading(false);
  };

  const fetchInvestmentChartData = async () => {
    const investmentChartData = await get(
      `/api/investments/chart-data?userId=${user!._id}`,
      "Failed to fetch investment chart data"
    );
    setSelectedInvestmentChartData(investmentChartData);
  };

  useEffect(() => {
    if (user) {
      fetchInvestments();
    }
  }, []);

  useEffect(() => {
    if (investments.length) {
      fetchInvestmentChartData();
    }
  }, [investments]);

  return (
    <>
      {areInvestmentsLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <div className="flex flex-row justify-center items-center w-full">
          <div className="text-center h-[4rem]">
            <h1 className="text-xl font-semibold">
              {selectedInvestment?.brokerageName
                ? selectedInvestment?.brokerageName
                : "Net Worth"}
            </h1>
            {selectedInvestmentChartData && (
              <h3 className="font-thin opacity-80 mt-1">{`${
                selectedInvestmentChartData[0].month
              } - ${
                selectedInvestmentChartData[
                  selectedInvestmentChartData.length - 1
                ].month
              }`}</h3>
            )}
          </div>
          {selectedInvestmentChartConfig && (
            <div className="w-[50%]">
              <ChartContainer config={selectedInvestmentChartConfig}>
                <BarChart accessibilityLayer data={selectedInvestmentChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis type="number" tickLine={false} tickMargin={10} />
                  {/* TODO: fix the white background this gives (or just get rid of it) */}
                  {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
                  <ChartLegend content={<ChartLegendContent />} />
                  {Object.keys(selectedInvestmentChartConfig).map((key) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId="a"
                      fill={`var(--color-${key})`}
                    />
                  ))}
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>
      )}
    </>
  );
}
