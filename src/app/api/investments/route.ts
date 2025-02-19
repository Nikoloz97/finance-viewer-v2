import { WithId } from "mongodb";
import clientPromise from "../mongodb";
import { Investment } from "@/lib/models/investments";
import { NextResponse } from "next/server";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function GET(): Promise<NextResponse<WithId<Investment>[]>> {
  const allInvestments = await investments.find({}).toArray();
  return NextResponse.json(allInvestments);
}
