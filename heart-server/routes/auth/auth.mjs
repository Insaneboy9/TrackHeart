import express from "express";
import { readData } from "../../functions/functions.mjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "iduhdcuisuigui9798789ncdkjncdksncds";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await readData("users", {
    username: username,
    password: password,
  });

  console.log(user);

  if (user.length > 0) {
    const token = jwt.sign({ username: user.name }, JWT_SECRET);
    return res.json({ status: "ok", user: token, username: username });
  } else {
    return res.json({ status: "error", user: false });
  }
});

export default router;
