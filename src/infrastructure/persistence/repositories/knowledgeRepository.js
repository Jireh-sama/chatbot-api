/*
  Repositories serve as a bridge between the use cases and the data storage system. 
  They encapsulate the logic for retrieving and persisting data, ensuring that the 
  rest of the application is not tied to the details of the data storage.
*/
function knowledgeRepository(db) {
    
    const getKnowledgeCollection  = async () => {
      const filter = { _id: 0 }
      return await db.readCollection({}, filter)
    }

    const getKnowledgeBaseList = async () => {
      const filter = { _id: 0, knowledgeEntry: 0 }
      return await db.readCollection({}, filter)
    }

    const getKnowledgeBase = async (knowledgeBase, filter = null) => {
      const query = { knowledgeBase }
      const isSingle = true
      return await db.readCollection(query, filter, isSingle)
    }

    // retrieve a single knowledge entry item
    const getKnowledgeEntry = async (intent) => {
      const query = { 'knowledgeEntry.intent': intent };
      const projection = { 'knowledgeEntry.$': 1 };
      const isSingle = true;
      return await db.readCollection(query, projection, isSingle)
    }

    const getTop5KnowledgeEntry = async () => {
      const pipeline = [
        { $unwind: '$knowledgeEntry' }, // Deconstructs the knowledgeEntry array
        { $sort: { 'knowledgeEntry.frequency': -1 } }, // Sorts by frequency in descending order
        { $limit: 5 }, // Limits to the top 5 results
        { 
          $project: {
            intent: '$knowledgeEntry.intent',  
            document: '$$ROOT',
            frequency: '$knowledgeEntry.frequency'
          } 
        } 
      ]
      return await db.aggregateDocuments(pipeline)
    }

    const createKnowledgeBase = async (knowledgeBase, knowledgeEntries) => {
      const query = { knowledgeBase, knowledgeEntry: [ ...knowledgeEntries ] }
      await db.addDocument(query);
    }

    const readKnowledgeEntry = async (knowledgeBase) => {
      const query = { knowledgeBase }
      const filter = { _id: 0, knowledgeBase: 0, 'knowledgeEntry.frequency': 0 }
      const isSingle = true
      return await db.readCollection(query, filter, isSingle)
    }

    const deleteKnowledgeEntry = async (knowledgeBase, knowledgeEntryIntent) => {
      const query = { knowledgeBase }
      const updateData = { $pull: { knowledgeEntry: { intent: knowledgeEntryIntent } } }
      await db.updateDocument(query, updateData)
    }

    const deleteKnowledgeBase = async (knowledgeBase) => {
      const filter = { knowledgeBase }
      return await db.deleteDocument(filter);
    }
    // Removes a value from a specified document field
    const deleteKnowledgeEntryDocument = async (knowledgeEntryIntent, documentValue) => {
      const filter = {"knowledgeEntry.intent": knowledgeEntryIntent}
      const updateDocument = {
        $pull: {
          "knowledgeEntry.$.documents": documentValue
        },
      }; 
      await db.updateDocument(filter, updateDocument)
    }
    
    const updateKnowledgeBase = async (knowledgeBase, updatedKnowledgeEntry) => {
      const { intent, documents, answer } = updatedKnowledgeEntry;
      const filter = {'knowledgeEntry.intent': intent}
      const updateDocument = { $set: { 'knowledgeEntry.$.intent': intent, 'knowledgeEntry.$.documents': documents, 'knowledgeEntry.$.answer': answer } }
      await db.updateDocument(filter, updateDocument)
    }

    // Update the value of the specified knowledge entry item
    const updateKnowledgeEntry = async (knowledgeEntryIntent, updatedKnowledgeEntry) => {
      const { intent, documents, answer, fileUrl } = updatedKnowledgeEntry;
      const filter = {'knowledgeEntry.intent': knowledgeEntryIntent}
      const updateDocument = { $set: { 'knowledgeEntry.$.intent': intent, 'knowledgeEntry.$.documents': documents, 'knowledgeEntry.$.answer': answer, 'knowledgeEntry.$.fileUrl': fileUrl } }
      await db.updateDocument(filter, updateDocument)
    }

    const updateKnowledgeBaseName = async (knowledgeBaseName, newKnowledgeBaseName) => {
      const filter = { knowledgeBase: knowledgeBaseName }
      const updateDocument = { $set: { knowledgeBase: newKnowledgeBaseName } }
      await db.updateDocument(filter, updateDocument)
    }

    const addKnowledgeEntry = async (knowledgeBase, knowledgeEntry) => {
      const query = { knowledgeBase }
      const updateData = { $push: { knowledgeEntry } }
      await db.insertDocument(query, updateData)
    }

    const incrementKnowledgeEntryFrequency = async (knowledgeEntryIntent) => {
      const filter = { 'knowledgeEntry.intent': knowledgeEntryIntent }; // Match the intent
      const update = {
        $inc: { 'knowledgeEntry.$.frequency': 1 }, // Increment the frequency
      };

      await db.updateDocument(filter, update)
    }

    return {
      getKnowledgeBase,
      getKnowledgeEntry,
      getTop5KnowledgeEntry,
      readKnowledgeEntry,
      createKnowledgeBase,
      updateKnowledgeBase,
      getKnowledgeCollection,
      deleteKnowledgeBase,
      deleteKnowledgeEntryDocument,
      deleteKnowledgeEntry,
      updateKnowledgeEntry,
      updateKnowledgeBaseName,
      getKnowledgeBaseList,
      addKnowledgeEntry,
      incrementKnowledgeEntryFrequency,
    };
}

export default knowledgeRepository


