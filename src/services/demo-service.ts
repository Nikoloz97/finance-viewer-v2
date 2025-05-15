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
import { DemoData } from "@/demo-context";
import {
  ChartDataStatement,
  Investment,
  InvestmentChartData,
  Statement,
} from "@/lib/models/investments";
import { months } from "@/lib/months";
import { z } from "zod";

export class DemoService {
  // TODO: remove isDemo and updateDemoData??
  private isDemo: boolean;
  private demoData: DemoData;
  private updateDemoData: <K extends keyof DemoData>(
    key: K,
    newData: DemoData[K]
  ) => void;

  constructor(
    isDemo: boolean,
    demoData: DemoData,
    updateDemoData: <K extends keyof DemoData>(
      key: K,
      newData: DemoData[K]
    ) => void
  ) {
    this.isDemo = isDemo;
    this.demoData = demoData;
    this.updateDemoData = updateDemoData;
  }

  fetchInvestments(): Investment[] {
    return this.demoData["investments"] as Investment[];
  }

  fetchInvestmentChartData(): InvestmentChartData[] {
    const investments = this.demoData["investments"];
    // get the latest end date
    let latestEndDate: Date | null = null;

    for (const investment of investments) {
      if (investment.statements && investment.statements.length > 0) {
        for (const statement of investment.statements) {
          const currentEndDate = statement.endDate;

          if (!latestEndDate || currentEndDate > latestEndDate) {
            latestEndDate = currentEndDate;
          }
        }
      }
    }

    // get latest month index + initialize chart data
    let latestMonthIndex = null;
    if (latestEndDate) {
      latestMonthIndex = getMonthIndex(latestEndDate);
    }

    let chartData: InvestmentChartData[] | null = null;

    if (latestMonthIndex) {
      chartData = getMonthsArray(latestMonthIndex, 3);
    }

    // get cut off date
    let cutOffDate = null;
    if (latestEndDate) {
      cutOffDate = getCutOffDate(latestEndDate, -2);
    }

    // get eligible chart data statements
    const eligibleChartDataStatements: ChartDataStatement[] = [];

    if (cutOffDate) {
      for (const investment of investments) {
        const brokerageName = investment.brokerageName;

        if (investment.statements && investment.statements.length > 0) {
          for (const statement of investment.statements) {
            const statementEndDate = statement.endDate;

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

    // build out chart data
    if (chartData) {
      eligibleChartDataStatements.forEach((statement) => {
        // TODO: account for statements that span multiple months here
        chartData.forEach((chartDataPoint) => {
          if (
            chartDataPoint.month ===
            months[getMonthIndex(new Date(statement.startDate))]
          ) {
            chartDataPoint[statement.brokerageName.replace(/\s+/g, "")] =
              parseFloat(statement.startBalance.toString());
          } else if (
            chartDataPoint.month ===
            months[getMonthIndex(new Date(statement.endDate))]
          ) {
            chartDataPoint[statement.brokerageName.replace(/\s+/g, "")] =
              parseFloat(statement.endBalance.toString());
          }
        });
      });
    }

    if (chartData) {
      return chartData;
    } else {
      return [];
    }
  }

  addInvestment(formData: z.infer<typeof investmentAddFormSchema>): Response {
    const investmentData: Investment = {
      brokerageName: formData.brokerageName,
      type: formData.type,
      subtype: formData.subtype,
      color: formData.color,
      userId: this.demoData.user._id!,
      statements: [
        {
          // TODO: fix this string hardcoding (and elsewhere on this file)
          _id: "demo-statement-id-999",
          startDate: formData.startDate,
          startBalance: toDollarAmount(formData.startBalance),
          endDate: new Date(formData.endDate),
          endBalance: toDollarAmount(formData.endBalance),
          depositAmount: toDollarAmount(formData.depositAmount),
          withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
        },
      ],
    };

    const newInvestment = {
      _id: "demo-investment-id-999",
      ...investmentData,
    };

    this.demoData.investments.push(newInvestment);

    return new Response(
      JSON.stringify({ success: true, data: newInvestment }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  deleteInvestment(id: string): Response {
    const idStr = id.toString();
    const index = this.demoData.investments.findIndex(
      (inv) => inv._id!.toString() === idStr
    );

    if (index === -1) {
      // TODO: error message
      return new Response();
    }

    this.demoData.investments.splice(index, 1);

    // TODO: success message
    return new Response();
  }

  addStatement(
    formData: z.infer<typeof statementAddFormSchema>,
    investmentId: string
  ): Response {
    const invIdStr = investmentId.toString();
    const index = this.demoData.investments.findIndex(
      (inv) => inv._id!.toString() === invIdStr
    );

    if (index === -1) {
      // TODO: error message
      return new Response();
    }

    // TODO: create statement overlap logic here

    const newStatement = {
      _id: "demo-statement-id-9999",
      startDate: new Date(formData.startDate),
      startBalance: toDollarAmount(formData.startBalance),
      endDate: new Date(formData.endDate),
      endBalance: toDollarAmount(formData.endBalance),
      depositAmount: toDollarAmount(formData.depositAmount),
      withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
    };

    this.demoData.investments[index].statements.push(newStatement);

    // TODO: success message
    return new Response();
  }

  updateStatement(formData: z.infer<typeof statementEditFormSchema>): Response {
    const invIdStr = formData.investmentId.toString();
    const stmtIdStr = formData._id.toString();

    const invIndex = this.demoData.investments.findIndex(
      (inv) => inv._id!.toString() === invIdStr
    );

    if (invIndex === -1) {
      // TODO: return error (can't find investment)
      return new Response();
    }

    const stmtIndex = this.demoData.investments[invIndex].statements.findIndex(
      (stmt) => stmt._id.toString() === stmtIdStr
    );

    if (stmtIndex === -1) {
      // TODO: return error (can't find statement)
      return new Response();
    }

    // TODO: statement overlap logic here

    const updatedStatement: Statement = {
      _id: formData._id,
      startDate: new Date(formData.startDate),
      startBalance: toDollarAmount(formData.startBalance),
      endDate: new Date(formData.endDate),
      endBalance: toDollarAmount(formData.endBalance),
      depositAmount: toDollarAmount(formData.depositAmount),
      withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
    };

    this.demoData.investments[invIndex].statements[stmtIndex] =
      updatedStatement;

    // TODO: return success
    return new Response();
  }

  deleteStatement(investmentId: string, statementId: string): Response {
    const invIndex = this.demoData.investments.findIndex(
      (inv) => inv._id!.toString() === investmentId
    );

    if (invIndex === -1) {
      // TODO: return failure
      return new Response();
    }

    const stmtIndex = this.demoData.investments[invIndex].statements.findIndex(
      (stmt) => stmt._id.toString() === statementId
    );

    if (stmtIndex === -1) {
      // TODO: return failure
      return new Response();
    }

    this.demoData.investments[invIndex].statements.splice(stmtIndex, 1);
    // TODO: return success
    return new Response();
  }
}
