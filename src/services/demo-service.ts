import {
  investmentAddFormSchema,
  statementAddFormSchema,
  statementEditFormSchema,
} from "@/app/investments/form-schemas";
import { toDollarAmount } from "@/app/utils/formatters";
import { DemoData } from "@/demo-context";
import {
  Investment,
  InvestmentChartData,
  Statement,
} from "@/lib/models/investments";
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
    // TODO: get the latest end date object
    //
    return [];
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
