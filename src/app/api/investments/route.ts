import { ObjectId, OptionalId, WithId } from "mongodb";
import clientPromise from "../mongodb";
import { Investment } from "@/lib/models/investments";
import { NextRequest, NextResponse } from "next/server";
import { toDollarAmount } from "@/app/utils/formatters";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function GET(
  request: Request
): Promise<
  NextResponse<WithId<Investment>[]> | NextResponse<{ message: string }>
> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json([]);
    }

    const userInvestments = await investments
      .find({ userId: userId })
      .toArray();
    return NextResponse.json(userInvestments);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
): Promise<
  NextResponse<OptionalId<Investment>[]> | NextResponse<{ message: string }>
> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "No user Id was passed" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const redundantInvestment = await investments
      .aggregate([
        {
          $match: {
            userId: userId,
            brokerageName: body.brokerageName,
            type: body.type,
            subtype: body.subtype,
          },
        },
        {
          $project: {
            _id: 1,
            brokerageName: 1,
            type: 1,
            subtype: 1,
          },
        },
      ])
      .toArray();

    if (redundantInvestment.length > 0) {
      return NextResponse.json(
        { message: "Investment already exists for user" },
        { status: 400 }
      );
    }

    const newInvestmentData: OptionalId<Investment> = {
      brokerageName: body.brokerageName,
      type: body.type,
      subtype: body.subtype,
      color: body.color,
      userId: userId,
      statements: [
        {
          _id: new ObjectId().toString(),
          startDate: body.startDate,
          startBalance: toDollarAmount(body.startBalance),
          endDate: new Date(body.endDate),
          endBalance: toDollarAmount(body.endBalance),
          depositAmount: toDollarAmount(body.depositAmount),
          withdrawalAmount: toDollarAmount(body.withdrawalAmount),
        },
      ],
    };

    await investments.insertOne(newInvestmentData);
    return NextResponse.json({
      message: "Investment add successful",
      newInvestmentData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating new investment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse<{ message: string }>> {
  const { searchParams } = new URL(request.url);
  const investmentId = searchParams.get("investmentId");

  try {
    if (!investmentId) {
      return NextResponse.json(
        {
          message: "No investment Id was passed",
        },
        { status: 400 }
      );
    }

    const result = await investments.deleteOne({
      _id: new ObjectId(investmentId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        message: "No investment found with the given investment Id",
      });
    } else {
      return NextResponse.json({ message: "Investment deleted successfully!" });
    }
  } catch (error) {
    console.error("Error deleting investment:", error);
    NextResponse.json({ message: "Failed to delete investment" });
  }

  return NextResponse.json({ message: "Investment deleted successfully!" });
}
