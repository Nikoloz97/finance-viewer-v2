import { WithId } from "mongodb";
import clientPromise from "./mongodb";
import { Investment } from "./definitions";

const client = await clientPromise;
const db = client.db("FinanceViewer");

export async function fetchInvestments(): Promise<WithId<Investment>[]> {
  // TODO: remove this
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const allInvestments = await db
    .collection<Investment>("Investments")
    .find({})
    .toArray();
  return allInvestments;
}
