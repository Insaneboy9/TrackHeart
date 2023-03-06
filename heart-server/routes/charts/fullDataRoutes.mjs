import express from "express";
import { readData } from "../../functions/functions.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  const fullData = patientsDocuments.map((val, index) => ({
    ...val,
    ...recordsDocuments[index],
  }));

  res.json(fullData);
});

export default router;
