import express from "express";
import { readData } from "../../functions/functions.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    const patientsDocuments = await readData("patients", {});
  const recordsDocuments = await readData("medicalRecords", {});
  const fullData = patientsDocuments.map((val, index) => ({
    ...val,
    ...recordsDocuments[index],
  }));

  var ageBtw = [
    { count: 0, output: 0, label: "0-20" },
    { count: 0, output: 0, label: "20-40" },
    { count: 0, output: 0, label: "40-60" },
    { count: 0, output: 0, label: "60-80" },
    { count: 0, output: 0, label: "80-100" },
    { count: 0, output: 0, label: "100+" },
  ];

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

export default router;