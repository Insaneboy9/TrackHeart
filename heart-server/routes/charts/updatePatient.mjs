import express from "express";
import { updateData } from "../../functions/functions.mjs";

const router = express.Router();

router.put("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  const response = await updateData("patients", data.id, data.data);
  res.send(response);
});

export default router;
