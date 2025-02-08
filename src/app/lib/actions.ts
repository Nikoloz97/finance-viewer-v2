"use server";

import { WithId } from "mongodb";
import clientPromise from "./mongodb";
import { Investment } from "./definitions";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function createInvestment(
  formData: FormData
): Promise<WithId<Investment>[]> {
  // TODO: figure out how to deconstruct formData
  // const {
  //     brokerageName,
  //     type,
  //     subtype,
  //     color,
  //     userId,
  //     startDate,
  //     startBalance,
  //     endDate,
  //     endBalance,
  //     depositAmount,
  //     withdrawalAmount,
  //   } = req.body;
  //   const newInvestmentData = {
  //     brokerageName,
  //     type,
  //     subtype,
  //     color,
  //     userId,
  //     statements: [
  //       {
  //         statementId: new ObjectId(),
  //         startDate: new Date(startDate),
  //         startBalance: toDollarAmount(startBalance.toString()),
  //         endDate: new Date(endDate),
  //         endBalance: toDollarAmount(endBalance.toString()),
  //         depositAmount: toDollarAmount(depositAmount.toString()),
  //         withdrawalAmount: toDollarAmount(withdrawalAmount.toString()),
  //       },
  //     ],
  //   };
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

  // TODO: eventually remove
  return [];
}
