import express from "express";
import { insertData } from "../../functions/functions.mjs";
import { csvToDb } from "../../functions/csvToDb.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  var dataArray = await csvToDb(); // first element represents patient data, second element represents medical records
  await insertData("patients", dataArray[0]);
  await insertData("medicalRecords", dataArray[1]);
  res.send("Data received");
});

export default router;