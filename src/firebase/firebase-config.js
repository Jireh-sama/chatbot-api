const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with the service account key file
const serviceAccount = require('../serviceAccount/cob-chatbot-firebase-adminsdk-ix45m-b355fda3f7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to Firestore
const db = admin.firestore();



module.exports = async function fetchData(collectionName) {
  try {
    // Reference to the collection you want to read from
    const dataRef = db.collection(collectionName);

    const dataArray = [];
    
    // Get all documents in the collection
    const querySnapshot = await dataRef.get();

    // Iterate over each document and log its data
    querySnapshot.forEach(doc => {
      const docData = {
        id: doc.id,
        query: doc.data(),
      }
      dataArray.push(docData);
    });

    return dataArray;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
};

// // Call the fetchData function to fetch data from Firestore
// fetchData();