import db from '../mongoconn.mjs';

// insert data
export async function insertData(collectionName, data) {
    const collection = db.collection(collectionName);
    let result;
    if (Array.isArray(data)) {
      result = await collection.insertMany(data);
    } else {
      result = await collection.insertOne(data);
    }
    return result;
  }

// delete data
export async function deleteData(collectionName, filter) {
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne(filter);
  return result;
}

// update data
export async function updateData(collectionName, filter, update) {
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(filter, { $set: update });
  return result;
}

// read data
export async function readData(collectionName, filter) {
  const collection = db.collection(collectionName);
  const result = await collection.find(filter).toArray();
  return result;
}