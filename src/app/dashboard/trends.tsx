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

const investments = {
  name: "Investments",
  overallPercentage: 0.65,
  subsets: [
    {
      name: "Webull",
      percentage: 0.72,
    },
    {
      name: "Fidelity",
      percentage: 0.25,
    },
    {
      name: "Vanguard",
      percentage: 0.53,
    },
  ],
};

const debts = {
  name: "Debts",
  overallPercentage: -2.5,
  subsets: [
    {
      name: "Student Loans",
      percentage: -2.5,
    },
    {
      name: "Bootcamp Loan",
      percentage: -10.5,
    },
    {
      name: "Credit Card",
      percentage: -3.5,
    },
  ],
};

const goals = {
  name: "Goals",
  overallPercentage: 25.25,
  subsets: [
    {
      name: "Save 10,000 in savings account",
      percentage: 33.33,
    },
    {
      name: "Pay off student loans",
      percentage: 15.25,
    },
    {
      name: "Pay off credit card debt",
      percentage: 20.4,
    },
  ],
};

export default function Trends() {
  return (
    <Card className="w-[90%] h-[90%] bg-zinc-900/90 border-zinc-800 text-zinc-100 overflow-y-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-center">
          Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Investments */}
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="Investments" className="w-full">
            <AccordionTrigger className="w-full hover:no-underline">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xl">{investments.name}</div>
                <div className="flex items-center gap-1.5">
                  {investments.overallPercentage > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-rose-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      investments.overallPercentage > 0
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {investments.overallPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            {investments.subsets.map((subset) => (
              <AccordionContent>
                <div className="flex items-center gap-1.5 pl-4">
                  {subset.name}
                  {subset.percentage > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-rose-500" />
                  )}
                  <div
                    className={`text-sm font-medium ${
                      subset.percentage > 0
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {subset.percentage.toFixed(1)}%
                  </div>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>

        {/* Debts */}
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="Investments" className="w-full">
            <AccordionTrigger className="w-full hover:no-underline">
              <div className="flex items-center justify-between gap-2">
                <div className="text-lg">{debts.name}</div>
                <div className="flex items-center gap-1.5">
                  {debts.overallPercentage < 0 ? (
                    <ArrowDownRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-rose-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      debts.overallPercentage < 0
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {debts.overallPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            {debts.subsets.map((subset) => (
              <AccordionContent>
                <div className="flex items-center gap-1.5 pl-4">
                  {subset.name}
                  {subset.percentage > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-rose-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-emerald-500" />
                  )}
                  <div
                    className={`text-sm font-medium ${
                      subset.percentage > 0
                        ? "text-rose-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {subset.percentage.toFixed(1)}%
                  </div>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>

        {/* Goals */}
        <Accordion type="multiple" className="w-full">
          <AccordionItem value={goals.name}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between gap-5">
                <span className="text-lg">{goals.name}</span>
                <div className="flex gap-2">
                  <div className="text-xs mt-0.5">
                    {goals.overallPercentage}%
                  </div>
                  <div className="w-full">
                    <Progress
                      value={goals.overallPercentage}
                      className="mt-1.5 h-[10px] w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            {goals.subsets.map((subset) => (
              <AccordionContent className="pl-4">
                <div className="flex items-center gap-10">
                  <span className="text-sm">{subset.name}</span>
                  <div className="flex gap-2">
                    <div className="text-xs mt-0.5">{subset.percentage}%</div>
                    <div className="w-full">
                      <Progress
                        value={subset.percentage}
                        className="mt-1.5 h-[10px] w-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
