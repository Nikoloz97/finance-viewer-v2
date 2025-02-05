import clientPromise from "../../app/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("FinanceViewer");
  switch (req.method) {
    case "GET":
      const allInvestments = await db
        .collection("Investments")
        .find({})
        .toArray();
      res.json({ status: 200, data: allInvestments });
      break;
  }
}
