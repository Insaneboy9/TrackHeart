import express from "express";
import { readData } from "../../functions/functions.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    const patientsDocuments = await readData("patients", {});
  
    var ecg = [
      { output: 0, label: "Normal" },
      { output: 0, label: "ST-T Wave Abnormality" },
      {
        output: 0,
        label: "Ventricular Hypertrophy by Estes' Criteria",
      },
    ];
  
    for (var i = 0; i < patientsDocuments.length; i++) {
      if (patientsDocuments[i].rest_ecg == 0) {
        ecg[0].output++;
      } else if (patientsDocuments[i].rest_ecg == 1) {
        ecg[1].output++;
      } else if (patientsDocuments[i].rest_ecg == 2) {
        ecg[2].output++;
      }
    }
  
    res.json(ecg);
});

export default router;