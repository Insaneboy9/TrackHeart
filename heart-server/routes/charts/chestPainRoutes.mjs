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
  
    var chestPain = [
      { output: 0, label: "Typical Angina" },
      { output: 0, label: "Atypical Angina" },
      { output: 0, label: "Non-anginal Pain" },
      { output: 0, label: "Asymptomatic" },
    ];
  
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

export default router;