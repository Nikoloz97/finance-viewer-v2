import { Investment } from "@/lib/models/investments";
import clientPromise from "../../mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { toDollarAmount } from "@/app/utils/formatters";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ message: string }>> {
  try {
    const body = await req.json();

    const { searchParams } = new URL(req.url);

    const investmentId = searchParams.get("investmentId");
    let investmentObjectId = null;
    if (investmentId) {
      investmentObjectId = new ObjectId(investmentId);
    }

    // TODO: is this necessary?
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    const statementOverlaps = await investments
      .aggregate([
        { $match: { _id: investmentObjectId } },
        { $unwind: "$statements" },
        {
          $match: {
            $or: [
              {
                "statements.startDate": {
                  // newStartDate >= startDate
                  $lt: startDate,
                },
                "statements.endDate": {
                  // newStartDate <= endDate
                  $gt: startDate,
                },
              },
              {
                "statements.startDate": {
                  // newStartDate <= startDate
                  $gt: startDate,
                  // newEndDate > startDate
                  $lte: endDate,
                },
              },
              {
                "statements.startDate": {
                  // newEndDate > startDate
                  $lte: endDate,
                },
                "statements.endDate": {
                  // newEndDate <= endDate
                  $gt: endDate,
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            "statements.startDate": 1,
            "statements.endDate": 1,
          },
        },
      ])
      .toArray();

    if (statementOverlaps.length > 0) {
      return NextResponse.json(
        { message: "Date range overlaps with existing statements" },
        { status: 400 }
      );
    }

    const newStatementData = {
      _id: new ObjectId(),
      startDate: startDate,
      startBalance: toDollarAmount(body.startBalance),
      endDate: endDate,
      endBalance: toDollarAmount(body.endBalance),
      depositAmount: toDollarAmount(body.depositAmount),
      withdrawalAmount: toDollarAmount(body.withdrawalAmount),
    };

    const newlyAddedStatement = await investments.updateOne(
      { _id: investmentObjectId! },
      { $push: { statements: newStatementData } }
    );

    if (newlyAddedStatement) {
      return NextResponse.json(
        { message: "Statement added successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "There was an issue adding the statement" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to add statement:", error);
    return NextResponse.json(
      { message: "Error adding statement" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest
): Promise<NextResponse<{ message: string }>> {
  try {
    const body = await req.json();

    // TODO: resolve this deprecation problem
    const investmentObjectId = new ObjectId(body.investmentId);
    const statementObjectId = new ObjectId(body.statementId);

    const startDateDate = new Date(body.startDate);
    const endDateDate = new Date(body.endDate);

    const statementOverlaps = await investments
      .aggregate([
        { $match: { _id: investmentObjectId } },
        { $unwind: "$statements" },
        { $match: { "statements._id": { $ne: statementObjectId } } },
        {
          $match: {
            $or: [
              {
                "statements.startDate": {
                  // newStartDate >= startDate
                  $lt: startDateDate,
                },
                "statements.endDate": {
                  // newStartDate <= endDate
                  $gt: startDateDate,
                },
              },
              {
                "statements.startDate": {
                  // newStartDate <= startDate
                  $gt: startDateDate,
                  // newEndDate > startDate
                  $lte: endDateDate,
                },
              },
              {
                "statements.startDate": {
                  // newEndDate > startDate
                  $lte: endDateDate,
                },
                "statements.endDate": {
                  // newEndDate <= endDate
                  $gt: endDateDate,
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            "statements.startDate": 1,
            "statements.endDate": 1,
          },
        },
      ])
      .toArray();

    if (statementOverlaps.length > 0) {
      return NextResponse.json(
        { message: "Date range overlaps with existing statements" },
        { status: 400 }
      );
    }

    const updateResult = await investments.updateOne(
      {
        _id: investmentObjectId,
        "statements._id": new ObjectId(body.statementId),
      },
      {
        $set: {
          "statements.$.startDate": startDateDate,
          "statements.$.startBalance": toDollarAmount(body.startBalance),
          "statements.$.endDate": endDateDate,
          "statements.$.endBalance": toDollarAmount(body.endBalance),
          "statements.$.depositAmount": toDollarAmount(body.depositAmount),
          "statements.$.withdrawalAmount": toDollarAmount(
            body.withdrawalAmount
          ),
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No statement found with given investment or statement ID" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Statement updated successfully!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Failed to update statement:", error);
    return NextResponse.json(
      { message: "Error updating statement" },
      { status: 500 }
    );
  }
}
