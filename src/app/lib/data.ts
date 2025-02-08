import { WithId } from "mongodb";
import clientPromise from "./mongodb";
import { Investment } from "./definitions";

const client = await clientPromise;
// TODO: reminder that you tweeked with this
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function fetchInvestments(): Promise<WithId<Investment>[]> {
  // TODO: remove this
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const allInvestments = await investments.find({}).toArray();
  return allInvestments;
}
