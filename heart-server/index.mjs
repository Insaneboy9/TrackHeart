import "./loadEnvironment.mjs";
import db from "./mongoconn.mjs";
import express from 'express';
const app = express();
const port = 8080;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/fullData', async (req, res) => {
  const patientsCollection = db.collection('patients');
  const patientsDocuments = await patientsCollection.find().toArray();
  res.json(patientsDocuments);
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});