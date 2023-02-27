import "./loadEnvironment.mjs";
import { readData, insertData } from "./functions/functions.mjs";
import { csvToDb } from "./functions/csvToDb.mjs";

import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fullData", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  console.log(patientsDocuments)
  const fullData = patientsDocuments.map((val,index) => ({...val,...recordsDocuments[index]}));
  res.json(fullData);
});

// Handle POST request
app.post("/insertEntry", (req, res) => {
  // Retrieve data from request body
  const data = req.body;

  // Send response
  res.send("Data received");
});

// Handle CSV to DB
app.get("/csvToDb", async (req, res) => { 
  var dataArray = await csvToDb(); // first element represents patient data, second element represents medical records
  await insertData("patients",dataArray[0])
  await insertData("medicalRecords",dataArray[1])
  res.send("Data received");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
