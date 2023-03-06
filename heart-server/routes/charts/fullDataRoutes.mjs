import express from "express";
import { readData } from "../../functions/functions.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  res.json(patientsDocuments);
});

export default router;
