import "./loadEnvironment.mjs";
import { readData, insertData } from "./functions/functions.mjs";
import { csvToDb } from "./functions/csvToDb.mjs";
import { handleData, jsonToArray } from "./functions/resultsconn.mjs";
import bodyParser from "body-parser";

import { spawn } from "child_process";
import express from "express";
const app = express();
const port = 8080;

app.use(bodyParser.json()); // for parsing application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
  const filteredArray = jsonToArray(data)
  const python = spawn("python", [
    "./knearestneighbour/knearestneighLOAD.py",
    JSON.stringify(filteredArray),
  ]);

  // Listen for data from the Python script via stdout
  python.stdout.on("data", (data) => { 
    console.log(`Received data from Python: ${data}`);
    res.send(data)
    // handleData(data, filteredArray); // This is to insert data to db
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
