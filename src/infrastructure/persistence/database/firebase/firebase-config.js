
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';


const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccount/cob-chatbot-firebase-adminsdk-ix45m-d65aeb395d.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export const db = admin.firestore();
