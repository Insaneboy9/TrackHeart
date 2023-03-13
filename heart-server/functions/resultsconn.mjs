import { insertData } from "./functions.mjs";

// Define an async function to handle the stdout data
export const handleData = async (data, inputArray) => {
  console.log(`Received data from Python: ${data}`);
  var singleArray = JSON.parse(data);
  inputArray.push(singleArray[0]);
  var patientJson = {
    age: inputArray[0],
    sex: inputArray[1],
    cp: inputArray[2],
    trtbps: inputArray[3],
    chol: inputArray[4],
    fbs: inputArray[5],
    rest_ecg: inputArray[6],
    thalach: inputArray[7],
    exang: inputArray[8],
    oldpeak: inputArray[9],
    slp: inputArray[10],
    ca: inputArray[11],
    thall: inputArray[12],
    output: inputArray[13],
  };
  await insertData("patients", patientJson);
};

export const jsonToArray = (data) => {
  const arr = [
    data.age,
    data.sex,
    data.cp,
    data.trtbps,
    data.chol,
    data.fbs,
    data.rest_ecg,
    data.thalach,
    data.exang,
    data.oldpeak,
    data.slp,
    data.ca,
    data.thall,
  ];
  return arr;
};
