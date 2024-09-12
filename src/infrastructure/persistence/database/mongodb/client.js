import { MongoClient } from "mongodb";

/**
 * Connects to a MongoDB database and returns a client object.
 *
 * @param {string} uri - The MongoDB connection URI.
 * @param {string} dbName - The name of the db to use.
 * @param {string} collectionName - The name of the collection to use.
 * @param {object} config - Additional configuration options.
 */
function mongoDbClient(uri, dbName, collectionName, config) {
  const client = new MongoClient(uri, config);
  // Collection instance
  let collection;

  const initializeCollection = async () => {
    if (!collection) {
      await client.connect();
      const db = client.db(dbName);
      collection = db.collection(collectionName);
    }
    return collection;
  };

  const addDocument = async (query) => {
    const collection = await initializeCollection();
    return await collection.insertOne(query);
  };

  const readCollection = async (query, projection, isSingle = false) => {
    const collection = await initializeCollection();
    return isSingle 
      ? await collection.findOne(query, { projection })
      : await collection.find(query, { projection }).toArray();
  }

  const insertDocument = async (query, updateData) => {
    const collection = await initializeCollection();
    return await collection.updateOne(query, updateData)
  }

  const updateDocument = async (filter, updateDpcument) => {
    const collection = await initializeCollection();
    const res = await collection.updateOne(filter, updateDpcument);

    if (res.matchedCount === 0) {
      throw new Error('No document found matching the filter')
    }
  };
  return { addDocument, readCollection, updateDocument, insertDocument };
}
export default mongoDbClient;
