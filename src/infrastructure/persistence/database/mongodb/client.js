import { MongoClient } from "mongodb";

/**
 * Connects to a MongoDB database and returns a client object.
 *
 * @param {string} uri - The MongoDB connection URI.
 * @param {string} collection - The name of the collection to use.
 * @param {object} config - Additional configuration options.
 */
async function mongoDbStorage(uri, dbName, collectionName, config){
  
  const client = new MongoClient(uri, config);
  // Collection instance
  let collection;

  const initializeCollection = async () => {
    if (!collection) {
      await client.connect()
      const db = client.db(dbName)
      collection = db.collection(collectionName)
    }
    return collection;
  }

  const createDocument = async ( data ) => {
    const collection = await initializeCollection();
    const result = collection.insertOne(data)
    console.log(result);
  }

  const readCollection = async () => {
    const collection = initializeCollection();
    return await collection.find()
  }

  return { createDocument, readCollection }
} 



export default mongoDbStorage