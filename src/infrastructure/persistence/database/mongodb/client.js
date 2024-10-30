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
  let collection, pingStatus;
  const initializeCollection = async () => {
    if (!collection) {
      await client.connect();
      const db = client.db(dbName);

      pingStatus = await db.command({ ping: 1 })
      collection = db.collection(collectionName);
    }
    return collection;
  };

  const ping = async () => {
    const collection = await initializeCollection();
    return pingStatus;
  }
  const closeConnection = async () => {
    await client.close();
    console.log('MongoDB connection closed');
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

  const insertDocument = async (filter, updated, options = {}) => {
    const collection = await initializeCollection();
    return await collection.updateOne(filter, updated, options)
  }

  const updateDocument = async (filter, updateDocument) => {
    const collection = await initializeCollection();
    const res = await collection.updateOne(filter, updateDocument);

    if (res.matchedCount === 0) {
      throw new Error('No document found matching the filter')
    }
  };

  const deleteDocument = async (filter) => {
    const collection = await initializeCollection();
    const result = await collection.deleteOne(filter)
    return result.deletedCount
  } 

  const aggregateDocuments = async (pipeline) => {
    const collection = await initializeCollection(); 
    const result = await collection.aggregate(pipeline).toArray(); 
    return result; 
  };

  return { ping, closeConnection, addDocument, readCollection, updateDocument, insertDocument, deleteDocument, aggregateDocuments };
}
export default mongoDbClient;
