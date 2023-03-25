import express from "express";
import db from "../../mongoconn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = db.collection("patients");

  const result = await collection
    .aggregate([
      {
        $match: { cp: { $in: ["1", "2", "3", "4"] } },
      },
      {
        $group: {
          _id: "$cp",
          output: { $sum: { $cond: [{ $eq: ["$output", "1"] }, 1, 0] } },
        },
      },
    ])
    .toArray();
  const data = result.map((r) => {
    var label;
    if (r._id === "1") {
      label = "Typical Angina";
    } else if (r._id === "2") {
      label = "Atypical Angina";
    } else if (r._id === "3") {
      label = "Non-Anginal Pain";
    } else if (r._id === "4") {
      label = "Asymptomatic";
    }
    return { output: r.output, label: label };
  });

  res.json(data);
});

export default router;
