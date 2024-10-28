import { db } from "./firebase-config.js";

export const insertDocument = async (collectionName, document) => {
  const ref = db.collection(collectionName).doc('model');
  await ref.set(document);
}