function modelRepository(db) {

  const getModalData = async () => {
    const isSingle = true;
    const query = { modelName: "default" }
    const projection = { "_id": 0 }
    return await db.readCollection(query, projection, isSingle)
  };

  const updateModelData = async (modelData) => {
    const filter = { modelName: "default" }
    const update = { $set: { model: modelData } }
    const options = { upsert: true }
    await db.insertDocument(filter, update, options)
  };

  return { getModalData, updateModelData }
}

export default modelRepository