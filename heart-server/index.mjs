import "./loadEnvironment.mjs";
import { jsonToArray } from "./functions/resultsconn.mjs";
import bodyParser from "body-parser";
import { spawn } from "child_process";
import express from "express";
import cors from "cors";
import fullDataRoutes from "./routes/charts/fullDataRoutes.mjs";
import chestPainRoutes from "./routes/charts/chestPainRoutes.mjs";
import ecgRoutes from "./routes/charts/ecgRoutes.mjs";
import ageRoutes from "./routes/charts/ageRoutes.mjs";
import csvDbRoutes from "./routes/csv/csvDbRoutes.mjs";
import updatePatient from "./routes/charts/updatePatient.mjs";
import auth from "./routes/auth/auth.mjs";
import { deleteData } from "./functions/functions.mjs";
import { ObjectId } from "mongodb";
import { handleData } from "./functions/resultsconn.mjs";

const app = express();
const port = 8080;
app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/fullData", fullDataRoutes);
app.use("/chestPainChartData", chestPainRoutes);
app.use("/ecgChartResult", ecgRoutes);
app.use("/ageChartData", ageRoutes);
app.use("/csvToDb", csvDbRoutes);
app.use("/patients", updatePatient);
app.use("/signin", auth);

// delete a patient using id
app.delete("/delete/:id", async (req, res) => {
  const data = req.params;
  console.log(data);
  const filter = { _id: new ObjectId(data) };
  const response = await deleteData("patients", filter);
  console.log(response);
  res.send(response);
});

//Handle post request to receive array of data, predict outcome and insert data to db
app.post("/predict", async (req, res) => {
  const data = req.body;
  const filteredArray = jsonToArray(data);
  const python = spawn("python", [
    "./knearestneighbour/knearestneighLOAD.py",
    JSON.stringify(filteredArray),
  ]);

  // Listen for data from the Python script via stdout
  python.stdout.on("data", (data) => {
    console.log(`Received data from Python: ${data}`);
    res.send(data);
    handleData(data, filteredArray); // This is to insert data to db
  });

  // Listen for errors from the Python script
  python.on("error", (err) => {
    console.error(`Failed to start Python script: ${err}`);
  });

  // Listen for the Python script to exit
  python.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });
});

//Port 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
