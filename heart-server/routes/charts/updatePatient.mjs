import express from "express";
import { updateData } from "../../functions/functions.mjs";
import { ObjectId  } from "mongodb";

const router = express.Router();

router.put("/", async (req, res) => {
  const data = req.body;
  const filter = { _id: new ObjectId(data.id) };
  const response = await updateData("patients", filter, data.data);
  console.log(response)
  res.send(response);
});

export default router;
