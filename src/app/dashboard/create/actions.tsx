"use server";

import clientPromise from "../../lib/mongodb";
import { Investment } from "../../lib/definitions";
import { ObjectId } from "mongodb";
import { toDollarAmount } from "../../utils/formatters";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function createInvestment(formData: FormData) {
  try {
    const newInvestmentData = {
      brokerageName: formData.get("brokerageName") as string,
      type: formData.get("type") as string,
      subtype: formData.get("subtype") as string,
      color: formData.get("color") as string,
      userId: formData.get("userId") as string,
      statements: [
        {
          statementId: new ObjectId().toString(),
          startDate: formData.get("startDate") as string,
          startBalance: toDollarAmount(formData.get("startBalance") as string),
          endDate: new Date(formData.get("endDate") as string),
          endBalance: toDollarAmount(formData.get("endBalance") as string),
          depositAmount: toDollarAmount(
            formData.get("depositAmount") as string
          ),
          withdrawalAmount: toDollarAmount(
            formData.get("withdrawalAmount") as string
          ),
        },
      ],
    };

    await investments.insertOne(newInvestmentData);
  } catch (error) {
    console.error(error);
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
