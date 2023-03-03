import "./loadEnvironment.mjs";
import { readData, insertData } from "./functions/functions.mjs";
import { csvToDb } from "./functions/csvToDb.mjs";
import { handleData } from "./functions/resultsconn.mjs";

import { spawn } from "child_process";
import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fullData", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  const fullData = patientsDocuments.map((val, index) => ({
    ...val,
    ...recordsDocuments[index],
  }));
  res.json(fullData);
});

// Handle CSV to DB
app.get("/csvToDb", async (req, res) => {
  var dataArray = await csvToDb(); // first element represents patient data, second element represents medical records
  await insertData("patients", dataArray[0]);
  await insertData("medicalRecords", dataArray[1]);
  res.send("Data received");
});

//Handle post request to receive array of data, predict outcome and insert data to db
app.post("/predict", async (req, res) => {
  const data = req.body;
  var answer = "done"
  const inputArray = [59, 1, 1, 144, 283, 1, 0, 132, 1, 2.6, 1, 1,1]; //sample test, to remove after check data variable
  const python = spawn("python", [
    "./knearestneighbour/knearestneighLOAD.py",
    JSON.stringify(inputArray),
  ]);

  // Listen for data from the Python script via stdout
  python.stdout.on("data", (data) => { //uncomment below to post to db and set answer as the output
    // handleData(data, inputArray);
    // answer = data
  });

  // Listen for errors from the Python script
  python.on("error", (err) => {
    console.error(`Failed to start Python script: ${err}`);
  });

  // Listen for the Python script to exit
  python.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.send(answer);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
