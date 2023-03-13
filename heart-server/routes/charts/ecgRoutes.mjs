import express from "express";
import db from "../../mongoconn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = db.collection("patients");

  const result = await collection
    .aggregate([
      {
        $match: { rest_ecg: { $in: ["0", "1", "2"] } },
      },
      {
        $group: {
          _id: "$rest_ecg",
          output: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const data = result.map((r) => {
    var label;
    if (r._id === "0") {
      label = "Normal";
    } else if (r._id === "1") {
      label = "ST-T Wave Abnormality";
    } else if (r._id === "2") {
      label = "Ventricular Hypertrophy by Estes' Criteria";
    }
    return { output: r.output, label: label };
  });
  res.json(data);
});

export default router;
