import clientPromise from "../../app/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("FinanceViewer");
  switch (req.method) {
    // TODO: adjust this eventually
    // case "POST":
    //   let bodyObject = JSON.parse(req.body);
    //   let myPost = await db.collection("posts").insertOne(bodyObject);
    //   res.json(myPost.ops[0]);
    //   break;
    case "GET":
      const allInvestments = await db
        .collection("Investments")
        .find({})
        .toArray();
      res.json({ status: 200, data: allInvestments });
      break;
  }
}
