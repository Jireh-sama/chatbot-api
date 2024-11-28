import { db, bucket } from "./firebase-config.js";

export const insertDocument = async (collectionName, document) => {
  const ref = db.collection(collectionName).doc('model');
  await ref.set(document);
}

export const deleteFile = async (filePath) => {
  await bucket.file(filePath).delete();
};