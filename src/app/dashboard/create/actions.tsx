"use server";

import clientPromise from "../../lib/mongodb";
import { Investment } from "../../lib/definitions";
import { ObjectId } from "mongodb";
import { toDollarAmount } from "../../utils/formatters";
import { z } from "zod";
import { addFormSchema } from "@/app/ui/dashboard/create-form";

const client = await clientPromise;
const investments = client
  .db("FinanceViewer")
  .collection<Investment>("Investments");

export async function createInvestment(
  formData: z.infer<typeof addFormSchema>
) {
  try {
    const newInvestmentData = {
      brokerageName: formData.brokerageName,
      type: formData.type,
      subtype: formData.subtype,
      color: formData.color,
      // TODO: set up useContext to get userId
      // userId: user._id,
      // TODO: remove this once userId is set up
      userId: "test",
      statements: [
        {
          statementId: new ObjectId().toString(),
          startDate: formData.startDate,
          startBalance: toDollarAmount(formData.startBalance),
          endDate: new Date(formData.endDate),
          endBalance: toDollarAmount(formData.endBalance),
          depositAmount: toDollarAmount(formData.depositAmount),
          withdrawalAmount: toDollarAmount(formData.withdrawalAmount),
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
