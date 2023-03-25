import express from "express";
import db from "../../mongoconn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = db.collection("patients");

  const result = await collection
    .aggregate([
      {
        $addFields: {
          ageRange: {
            $switch: {
              branches: [
                { case: { $lte: ["$age", "20"] }, then: "0-20" },
                { case: { $lte: ["$age", "40"] }, then: "20-40" },
                { case: { $lte: ["$age", "60"] }, then: "40-60" },
                { case: { $lte: ["$age", "80"] }, then: "60-80" },
                { case: { $gt: ["$age", "80"] }, then: "80+" },
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: "$ageRange",
          count: { $sum: 1 },
          output: { $sum: { $cond: [{ $eq: ["$output", "1"] }, 1, 0] } },
        },
      },
      {
        $sort: {
          _id: 1
        }
      }
    ])
    .toArray();

  res.json(result);
});

export default router;
