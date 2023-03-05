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

// data to display for chart
app.get("/chestPainChartData", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  const fullData = patientsDocuments.map((val, index) => ({
    ...val,
    ...recordsDocuments[index],
  }));

  var chestPain = {
    0: { output: 0, label: "Typical Angina" },
    1: { output: 0, label: "Atypical Angina" },
    2: { output: 0, label: "Non-anginal Pain" },
    3: { output: 0, label: "Asymptomatic" },
  };

  for (var i = 0; i < fullData.length; i++) {
    if (fullData[i].cp == 1) {
      chestPain[0].output++;
    } else if (fullData[i].cp == 2) {
      chestPain[1].output++;
    } else if (fullData[i].cp == 3) {
      chestPain[2].output++;
    } else if (fullData[i].cp == 4) {
      chestPain[3].output++;
    }
  }

  res.json(chestPain);
});

// resting electrocardiographic results (ecg)
app.get("/ecgChartResult", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  const fullData = patientsDocuments.map((val, index) => ({
    ...val,
    ...recordsDocuments[index],
  }));

  var ecg = {
    0: { output: 0, label: "Normal" },
    1: { output: 0, label: "ST-T Wave Abnormality" },
    2: {
      output: 0,
      label: "Ventricular Hypertrophy by Estes' Criteria",
    },
  };

  for (var i = 0; i < fullData.length; i++) {
    if (fullData[i].rest_ecg == 0) {
      ecg[0].output++;
    } else if (fullData[i].rest_ecg == 1) {
      ecg[1].output++;
    } else if (fullData[i].rest_ecg == 2) {
      ecg[2].output++;
    }
  }

  res.json(ecg);
});

app.get("/ageChartData", async (req, res) => {
  const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  const fullData = patientsDocuments.map((val, index) => ({
    ...val,
    ...recordsDocuments[index],
  }));

  var ageBtw = {
    0: { count: 0, output: 0, label: "0-20" },
    1: { count: 0, output: 0, label: "20-40" },
    2: { count: 0, output: 0, label: "40-60" },
    3: { count: 0, output: 0, label: "60-80" },
    4: { count: 0, output: 0, label: "80-100" },
    5: { count: 0, output: 0, label: "100+" },
  };

  for (var i = 0; i < fullData.length; i++) {
    if (fullData[i].age <= 20) {
      ageBtw[0].count++;
      fullData[i].output == 1 && ageBtw[0].output++;
    } else if (fullData[i].age > 20 && fullData[i].age <= 40) {
      ageBtw[1].count++;
      fullData[i].output == 1 && ageBtw[1].output++;
    } else if (fullData[i].age > 40 && fullData[i].age <= 60) {
      ageBtw[2].count++;
      fullData[i].output == 1 && ageBtw[2].output++;
    } else if (fullData[i].age > 60 && fullData[i].age <= 80) {
      ageBtw[3].count++;
      fullData[i].output == 1 && ageBtw[3].output++;
    } else if (fullData[i].age > 80 && fullData[i].age <= 10) {
      ageBtw[4].count++;
      fullData[i].output == 1 && ageBtw[4].output++;
    } else {
      ageBtw[5].count++;
      fullData[i].output == 1 && ageBtw[5].output++;
    }
  }

  for (var i = Object.keys(ageBtw).length - 1; i >= 0; i--) {
    if (ageBtw[i].count == 0) {
      delete ageBtw[i];
    }
  }

  res.json(ageBtw);
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
  var answer = "done";
  const inputArray = [59, 1, 1, 144, 283, 1, 0, 132, 1, 2.6, 1, 1, 1]; //sample test, to remove after check data variable
  const python = spawn("python", [
    "./knearestneighbour/knearestneighLOAD.py",
    JSON.stringify(inputArray),
  ]);

  // Listen for data from the Python script via stdout
  python.stdout.on("data", (data) => {
    //uncomment below to post to db and set answer as the output
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
