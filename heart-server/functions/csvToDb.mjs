import csv from "csvtojson";

export const csvToDb = async () => {
  var patientData, recordData;
  await csv()
    .fromFile("heart.csv")
    .then((jsonObj) => {
      // Separate the "sex" , "age" and target values into a new object
      patientData = jsonObj.map((obj) => ({
        age: obj.age,
        sex: obj.sex,
        output: obj.output,
      }));
      recordData = jsonObj.map((obj) => ({
        exang: obj.exng,
        ca: obj.caa,
        cp: obj.cp,
        thalach: obj.thalachh,
        fbs: obj.fbs,
        rest_ecg: obj.restecg,
        chol: obj.chol,
        trtbps: obj.trtbps,
      }));
    });

  return [patientData, recordData];
};
