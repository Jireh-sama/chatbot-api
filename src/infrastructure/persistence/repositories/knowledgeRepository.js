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

    const getKnowledgeBase = async (knowledgeBase) => {
      const query = { knowledgeBase }
      const isSingle = true
      return await db.readCollection(query, null, isSingle)
    }

    const createKnowledgeBase = async (knowledgeBase, knowledgeEntry) => {
      const query = { knowledgeBase, knowledgeEntry: [ knowledgeEntry ] }
      await db.addDocument(query);
    }

    const readKnowledgeEntry = async (knowledgeBase) => {
      const query = { knowledgeBase }
      const filter = { _id: 0, knowledgeBase: 0 }
      const isSingle = true
      return await db.readCollection(query, filter, isSingle)
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
    // Update the value of the specified knowledge entry item
    const updateKnowledgeEntry = async (knowledgeEntryIntent, updatedKnowledgeEntry) => {
      const { intent, documents, answer } = updatedKnowledgeEntry;
      const filter = {'knowledgeEntry.intent': knowledgeEntryIntent}
      const updateDocument = { $set: { 'knowledgeEntry.$.intent': intent, 'knowledgeEntry.$.documents': documents, 'knowledgeEntry.$.answer': answer } }
      await db.updateDocument(filter, updateDocument)
    }
    const addKnowledgeEntry = async (knowledgeBase, knowledgeEntry) => {
      const query = { knowledgeBase }
      const updateData = { $push: { knowledgeEntry } }
      await db.insertDocument(query, updateData)
    }

    const updateKnowledgeBase = async (knowledgeBase, updatedKnowledgeEntry) => {
      const { intent, documents, answer } = updatedKnowledgeEntry;
      const filter = {'knowledgeEntry.intent': intent}
      const updateDocument = { $set: { 'knowledgeEntry.$.intent': intent, 'knowledgeEntry.$.documents': documents, 'knowledgeEntry.$.answer': answer } }
      await db.updateDocument(filter, updateDocument)
    }

    return {
      getKnowledgeBase,
      readKnowledgeEntry,
      createKnowledgeBase,
      updateKnowledgeBase,
      getKnowledgeCollection,
      deleteKnowledgeEntryDocument,
      updateKnowledgeEntry,
      getKnowledgeBaseList,
      addKnowledgeEntry,
    };
}

export default knowledgeRepository


