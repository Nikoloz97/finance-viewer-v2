import {
  ChartDataStatement,
  Investment,
  InvestmentChartData,
} from "@/lib/models/investments";
import clientPromise from "../../mongodb";
import { NextResponse } from "next/server";
import {
  getCutOffDate,
  getMonthIndex,
  getMonthsArray,
} from "@/app/utils/dates";
import { months } from "@/lib/months";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function GET(
  request: Request
): Promise<
  NextResponse<InvestmentChartData[]> | NextResponse<{ message: string }>
> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const latestEndDateObject = await investments
      .aggregate([
        { $match: { userId: userId } },
        { $unwind: "$statements" }, // flatten each statement + break them up
        {
          $group: {
            _id: null,
            latestEndDate: { $max: "$statements.endDate" }, // regroup flattened investments into one
          },
        },
      ])
      .next(); // take first (and only) item

    if (latestEndDateObject === null) {
      return NextResponse.json({
        message: `Failed to attain latest statement end date for user id ${userId}`,
      });
    }

    const latestMonthIndex = getMonthIndex(latestEndDateObject.latestEndDate);

    const chartData: InvestmentChartData[] = getMonthsArray(
      latestMonthIndex,
      3
    );

    const cutoffDate = getCutOffDate(latestEndDateObject.latestEndDate, -2);

    const eligibleChartDataStatements = (await investments
      .aggregate([
        { $match: { userId: userId } },
        { $unwind: "$statements" }, // flatten statements
        {
          $match: {
            "statements.endDate": {
              $gte: cutoffDate, // filter out anything less than cutoff date
            },
          },
        },
        {
          $project: {
            brokerageName: 1, // 1 = include; 0 = don't include
            startDate: "$statements.startDate",
            endDate: "$statements.endDate",
            startBalance: "$statements.startBalance",
            endBalance: "$statements.endBalance",
          },
        },
      ])
      .toArray()) as ChartDataStatement[];

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

    if (eligibleChartDataStatements) {
      return NextResponse.json(chartData);
    } else {
      return NextResponse.json(
        { message: "Could not find eligible statement" },
        { status: 400 }
      );
    }
  } catch (error) {
    // TODO: put the following in a reusable function
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("Server error:", error); // log the full error for debugging

    return NextResponse.json(
      {
        message: errorMessage,
        ...(error instanceof Error && error.stack
          ? { stack: error.stack }
          : {}),
      },
      { status: 500 }
    );
  }
}
