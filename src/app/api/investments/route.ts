import { ObjectId, WithId } from "mongodb";
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
): Promise<NextResponse<WithId<Investment>[]>> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json([]);
  }

  const userInvestments = await investments.find({ userId: userId }).toArray();
  return NextResponse.json(userInvestments);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newInvestmentData = {
      brokerageName: body.brokerageName,
      type: body.type,
      subtype: body.subtype,
      color: body.color,
      // TODO: Will need to send along userId from request
      userId: "6623f7eb08a6b435b95a5dc3",
      statements: [
        {
          statementId: new ObjectId().toString(),
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
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

  // TODO: uncomment once above is figured out
  //   const redundantInvestment = await investments
  //     .aggregate([
  //       {
  //         $match: {
  //           userId: userId,
  //           brokerageName: brokerageName,
  //           type: type,
  //           subtype: subtype,
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           brokerageName: 1,
  //           type: 1,
  //           subtype: 1,
  //         },
  //       },
  //     ])
  //     .toArray();
  // TODO: figure out error handling
  //   if (redundantInvestment.length > 0) {
  //     return res.status(400).json({
  //       message:
  //         "Brokerage name, investment type, and investment subtype combination already exists",
  //     });
  //   }
  // TODO: uncomment once deconstruction is figured out
  //   const newlyCreatedInvestment = await investments.insertOne(newInvestmentData);
  // TODO: uncomment once above todo is figured out
  //   if (newlyCreatedInvestment) {
  //     res.send(newlyCreatedInvestment);
  //   } else {
  //     res.status(400).json({ message: "Error creating new investment" });
  //   }
}
