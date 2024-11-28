
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

  const removeKnowledgeArchive= async (type, id) => {
    const query = { type }
    const updateData = { $pull: { items: { _id: id } } }
    await db.updateDocument(query, updateData)
  };



  return { archiveData, getArchiveDocument, removeKnowledgeArchive }
}

export default archiveRepository