import express from "express";
import { insertData } from "../../functions/functions.mjs";
import { csvToDb } from "../../functions/csvToDb.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    var patientData = await csvToDb(); // first element represents patient data, second element represents medical records
    await insertData("patients", patientData);
    res.send("Data received");
  } catch (err) {
    res.status(500).send("Error inserting data into database: " + err.message);
  }
});

export default router;