
function archiveRepository(db) {

  const archiveData = async (type, document) => {
    const query = { type }
    const updateData = { $push: { items: document } }
    await db.insertDocument(query, updateData)
  };

  const getArchiveDocument = async (type) => {
    const query = { type }
    const filter = { _id: 0 }
    const isSingle = true
    return await db.readCollection(query, filter, isSingle)
  }

  const removeKnowledgeArchive = async (type, id) => {
    const query = { type }
    const updateData = { $pull: { items: { _id: id } } }
    await db.updateDocument(query, updateData)
  };

  const removeOldArchives = async (type, expirationDate) => {
    const query = { type }
    const updateData = { $pull: { items: { archivedAt: { $lt: expirationDate } } } }

    return await db.updateDocuments(query, updateData)
  }

  const getOldArchives = async (type) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const query = { 
      type,
      "items.archivedAt": { $lt: thirtyDaysAgo }
    };

    const filter = { _id: 0 };
    return await db.readCollection(query, filter);
  };

  return { archiveData, getArchiveDocument, removeKnowledgeArchive, removeOldArchives, getOldArchives }
}

export default archiveRepository