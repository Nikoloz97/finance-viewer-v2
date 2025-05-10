"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const trendData = [
  {
    name: "Investments",
    percentage: 12.3,
    isPositive: true,
  },
  {
    name: "Debt",
    percentage: 3.7,
    isPositive: false, // For debt, a decrease is positive
  },
];

const goalProgression = {
  name: "Goals",
  percentage: 33,
};

export default function Trends() {
  return (
    <Card className="w-[90%] h-[90%] bg-zinc-900/90 border-zinc-800 text-zinc-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-center">
          Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Accordion type="multiple" className="w-full">
          {trendData.map((item) => (
            <AccordionItem value={item.name} key={item.name} className="w-full">
              <AccordionTrigger className="w-full">
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="text-sm">{item.name}</div>
                  <div className="flex items-center gap-1.5">
                    {item.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-rose-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        item.isPositive ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem value={goalProgression.name}>
            <AccordionTrigger>
              <div className="flex items-center justify-between gap-5">
                <span className="text-sm">{goalProgression.name}</span>
                <div className="flex gap-2">
                  <div className="text-xs mt-0.5">
                    {goalProgression.percentage}%
                  </div>
                  <div className="w-full">
                    <Progress
                      value={goalProgression.percentage}
                      className="mt-1.5 h-[10px] w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
