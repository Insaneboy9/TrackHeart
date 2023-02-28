import "./loadEnvironment.mjs";
import { readData, insertData } from "./functions/functions.mjs";
import { csvToDb } from "./functions/csvToDb.mjs";

import {spawn} from "child_process";
import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fullData", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  console.log(patientsDocuments);
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
app.post("/predict", (req, res) => {
  const data = req.body;
  const inputArray = [60,1,0,145,282,0,0,142,1,2.8,1,2];
  const python = spawn("python", ["./knearestneighbour/knearestneighLOAD.py",JSON.stringify(inputArray)]);

  // Listen for data from the Python script via stdout
  python.stdout.on("data", (data) => {
    console.log(`Received data from Python: ${data}`);
    singleArray = JSON.parse(data)
    inputArray.push(singleArray[0])
    // var patientJson = {age: inputArray[0], sex: inputArray[1], output: inputArray}
    // var recordJson = {}
  });

  // Listen for errors from the Python script
  python.on("error", (err) => {
    console.error(`Failed to start Python script: ${err}`);
  });

  // Listen for the Python script to exit
  python.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.send("Done!");
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
