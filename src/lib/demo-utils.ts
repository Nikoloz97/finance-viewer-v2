"use client";

import {
  investmentAddFormSchema,
  statementAddFormSchema,
  statementEditFormSchema,
} from "@/app/investments/form-schemas";
import {
  getCutOffDate,
  getMonthIndex,
  getMonthsArray,
} from "@/app/utils/dates";
import { toDollarAmount } from "@/app/utils/formatters";
import {
  failureResponse,
  successResponse,
} from "@/app/utils/response-messages";
import { DemoData } from "@/demo-context";
import {
  ChartDataStatement,
  Investment,
  InvestmentChartData,
  Statement,
} from "@/lib/models/investments";
import { months } from "@/lib/months";
import { z } from "zod";

export function fetchDemoInvestments(demoData: DemoData): Investment[] {
  const investments = demoData.investments;
  return structuredClone(investments);
}

export function fetchDemoInvestmentChartData(
  investmentsParam: Investment[]
): InvestmentChartData[] {
  const investments = structuredClone(investmentsParam);

  let latestEndDate: Date | null = null;

  for (const investment of investments) {
    if (investment.statements && investment.statements.length > 0) {
      for (const statement of investment.statements) {
        const currentEndDate = new Date(statement.endDate);
        if (!latestEndDate || currentEndDate > latestEndDate) {
          latestEndDate = currentEndDate;
        }
      }
    }
  }

  let latestMonthIndex = null;
  if (latestEndDate) {
    latestMonthIndex = getMonthIndex(latestEndDate);
  }

  let chartData: InvestmentChartData[] | null = null;
  if (latestMonthIndex !== null) {
    chartData = getMonthsArray(latestMonthIndex, 3);
  }

  let cutOffDate = null;
  if (latestEndDate) {
    cutOffDate = getCutOffDate(latestEndDate, -2);
  }

  const eligibleChartDataStatements: ChartDataStatement[] = [];

  if (cutOffDate) {
    for (const investment of investments) {
      const brokerageName = investment.brokerageName;

      if (investment.statements && investment.statements.length > 0) {
        for (const statement of investment.statements) {
          const statementEndDate = new Date(statement.endDate);

          if (statementEndDate >= cutOffDate) {
            eligibleChartDataStatements.push({
              brokerageName,
              startDate: new Date(statement.startDate),
              endDate: statementEndDate,
              startBalance: statement.startBalance,
              endBalance: statement.endBalance,
            });
          }
        }
      }
    }
  }

  if (chartData) {
    eligibleChartDataStatements.forEach((statement) => {
      chartData!.forEach((chartDataPoint) => {
        const cleanBrokerage = statement.brokerageName.replace(/\s+/g, "");
        const startMonth = months[getMonthIndex(new Date(statement.startDate))];
        const endMonth = months[getMonthIndex(new Date(statement.endDate))];

        if (chartDataPoint.month === startMonth) {
          chartDataPoint[cleanBrokerage] = parseFloat(
            statement.startBalance.toString()
          );
        } else if (chartDataPoint.month === endMonth) {
          chartDataPoint[cleanBrokerage] = parseFloat(
            statement.endBalance.toString()
          );
        }
      });
    });
  }
  return chartData ?? [];
}

export function addDemoInvestment(
  demoData: DemoData,
  formData: z.infer<typeof investmentAddFormSchema>
) {
  // TODO: fix this hardcoding
  const investment: Investment = {
    _id: "demo-investment-id-999",
    brokerageName: formData.brokerageName,
    type: formData.type,
    subtype: formData.subtype,
    color: formData.color,
    userId: demoData.user._id!,
    statements: [
      {
        _id: "demo-statement-id-999",
        startDate: formData.startDate,
        endDate: new Date(formData.endDate),
        startBalance: toDollarAmount(formData.startBalance),
        endBalance: toDollarAmount(formData.endBalance),
        depositAmount: toDollarAmount(formData.depositAmount),
        withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
      },
    ],
  };

  demoData.investments.push(investment);
  return successResponse();
}

export function deleteDemoInvestment(
  demoData: DemoData,
  investmentId: string
): Response {
  const index = demoData.investments.findIndex((i) => i._id === investmentId);
  if (index === -1) return failureResponse();
  demoData.investments.splice(index, 1);
  return successResponse();
}

export function addDemoStatement(
  demoData: DemoData,
  formData: z.infer<typeof statementAddFormSchema>,
  investmentId: string
): Response {
  const inv = demoData.investments.find((i) => i._id === investmentId);
  if (!inv) return failureResponse();
  const statement: Statement = {
    _id: "demo-statement-id-9999",
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    startBalance: toDollarAmount(formData.startBalance),
    endBalance: toDollarAmount(formData.endBalance),
    depositAmount: toDollarAmount(formData.depositAmount),
    withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
  };

  inv.statements.push(statement);
  return successResponse();
}

export function updateDemoStatement(
  demoData: DemoData,
  formData: z.infer<typeof statementEditFormSchema>
): Response {
  const investment = demoData.investments.find(
    (inv) => inv._id === formData.investmentId
  );
  if (!investment) return new Response();

  const stmtIndex = investment.statements.findIndex(
    (stmt) => stmt._id === formData._id
  );
  if (stmtIndex === -1) return new Response();

  investment.statements[stmtIndex] = {
    _id: formData._id,
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    startBalance: toDollarAmount(formData.startBalance),
    endBalance: toDollarAmount(formData.endBalance),
    depositAmount: toDollarAmount(formData.depositAmount),
    withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
  };

  return new Response();
}

export function deleteDemoStatement(
  demoData: DemoData,
  investmentId: string,
  statementId: string
): Response {
  const investment = demoData.investments.find(
    (inv) => inv._id === investmentId
  );
  if (!investment) return failureResponse();

  const index = investment.statements.findIndex(
    (stmt) => stmt._id === statementId
  );

  if (index === -1) return failureResponse();

  investment.statements.splice(index, 1);
  return failureResponse();
}
