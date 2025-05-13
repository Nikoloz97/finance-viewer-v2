import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  InvestmentChartConfig,
  InvestmentChartData,
  SelectedInvestment,
} from "@/lib/models/investments";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import "./investments.css";

interface InvestmentDisplayProps {
  selectedInvestmentsChartData: InvestmentChartData[] | undefined;
  selectedInvestmentChartConfig: InvestmentChartConfig | undefined;
  selectedInvestment: SelectedInvestment | null;
}

export default function InvestmentDisplay({
  selectedInvestmentsChartData,
  selectedInvestmentChartConfig,
  selectedInvestment,
}: InvestmentDisplayProps) {
  return (
    <>
      <div className="ml-9 mb-2 text-center p-1">
        <h1 className="text-3xl font-semibold">
          {selectedInvestment?.brokerageName
            ? selectedInvestment?.brokerageName
            : "All Investments"}
        </h1>
        <p className="font-semibold text-xs p-1 min-h-[24px]">
          {selectedInvestment?.type}
          {selectedInvestment?.subtype
            ? ` (${selectedInvestment?.subtype})`
            : ""}
        </p>

        {selectedInvestmentsChartData && (
          <h3 className="font-thin opacity-80 mt-1">{`${
            selectedInvestmentsChartData[0].month
          } - ${
            selectedInvestmentsChartData[
              selectedInvestmentsChartData.length - 1
            ].month
          }`}</h3>
        )}
      </div>
      {selectedInvestmentChartConfig && (
        <ChartContainer config={selectedInvestmentChartConfig}>
          <BarChart accessibilityLayer data={selectedInvestmentsChartData}>
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
      )}
    </>
  );
}
