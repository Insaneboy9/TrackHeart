import "./loadEnvironment.mjs";
import { insertData, deleteData, updateData, readData } from './functions/functions.mjs';

import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fullData", async (req, res) => {
  const patientsDocuments = await readData("patients",{})
  const recordsDocuments = await readData("medicalRecords",{})
  const fullData = patientsDocuments.concat(recordsDocuments);
  res.json(fullData);
});

// Handle POST request
app.post("/insertEntry", (req, res) => {
  // Retrieve data from request body
  const data = req.body;
  // Separate the "sex" and "age" values into a new object
  const patientData = (({  age, sex, target }) => ({age, sex, target }))(data);
  // Separate the other values into a new object
  const recordData = (({ exang, ca, cp, thalach, fbs, rest_ecg, chol,trtbps }) => ({ exang, ca, cp, thalach, fbs, rest_ecg, chol,trtbps }))(data);
  // Send response
  res.send("Data received");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
