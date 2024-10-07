function knowledgeController(
  getKnowledgeCollectionUseCase,
  getKnowledgeEntryUseCase,
  getKnowledgeBaseUseCase,

  createKnowledgeBaseUseCase,
  deleteKnowledgeBaseUseCase,
  updateKnowledgeEntryUseCase,
  deleteKnowledgeEntryUseCase,
  deleteKnowledgeEntryDocumentUseCase,
  addKnowledgeEntryUseCase,
  
) {
  const createKnowledgeBase = async (req, res) => {
    const { knowledgeBaseName, knowledgeEntry } = req.body;
    await createKnowledgeBaseUseCase.execute(
      knowledgeBaseName,
      knowledgeEntry
    );
    console.log('Successfully created knowledge base:', knowledgeBaseName);
    return res
      .status(201)
      .json({
        success: true,
        message: `Knowledge Base: ${knowledgeBaseName} successfully created`,
      });
  };

  const getKnowledgeBase = async (req, res) => {
    const knowledgeBase = await getKnowledgeBaseUseCase.execute();
    return res.status(200).json({ success: true, knowledgeBase });
  };

  const getKnowledgeCollection = async (req, res) => {
    const knowledgeCollection = await getKnowledgeCollectionUseCase.execute();
    return res.status(200).json({ success: true, knowledgeCollection });
  };

  const getKnowledgeEntry = async (req, res) => {
    const { knowledgeBase } = req.params
    const knowledgeEntry = await getKnowledgeEntryUseCase.execute(knowledgeBase);
    return res.status(200).json({ success: true, knowledgeEntry });
  };

  const deleteKnowledgeBase = async (req, res) => {
    const { knowledgeBaseName } = req.params;
    const deletedItemCount = await deleteKnowledgeBaseUseCase.execute(knowledgeBaseName);
    console.log(`Successfully deleted ${deletedItemCount} document`);
    return res
      .status(200)
      .json({
        success: true,
        message: `Knowledge base ${knowledgeBaseName} deleted`,
      });
  };

  const updateKnowledgeEntry = async (req, res) => {
    const { knowledgeEntryIntent, knowledgeEntry } = req.body;
    await updateKnowledgeEntryUseCase.execute(knowledgeEntryIntent, knowledgeEntry);
    console.log(`Successfully updated the knowledge entry at knowledge base: ${knowledgeEntryIntent}`);
    return res
      .status(200)
      .json({
        success: true,
        message: `Knowledge entry updated`,
      });
  };

  const deleteKnowledgeEntry = async (req, res) => {
    console.log('deleteKnowledgeEntry');
    const { knowledgeBaseName, knowledgeEntryIndex } = req.body;
    await deleteKnowledgeEntryUseCase.execute(knowledgeBaseName, knowledgeEntryIndex)
    console.log(`Successfully deleted the knowledge entry at knowledge base: ${knowledgeBaseName}, index: ${knowledgeEntryIndex}`);
    return res.status(200).json({ success: true, message: 'Knowledge entry deleted' })
  }

  const deleteKnowledgeEntryDocument = async (req, res) => {
    console.log('correct');
    const { knowledgeEntryIntent, documentValue } = req.body;
    await deleteKnowledgeEntryDocumentUseCase.execute(knowledgeEntryIntent, documentValue)
    console.log('Delete knowledge entry doc');
    return res.status(200).json({ success: true, message: 'Knowledge entry document deleted' })
  }

  const addKnowledgeEntry = async (req, res) => {
    const { knowledgeBaseName, knowledgeEntry } = req.body
    await addKnowledgeEntryUseCase.execute(knowledgeBaseName, knowledgeEntry)
    console.log(`Successfully added a new knowledge entry at knowledge base: ${knowledgeBaseName} `);
    return res.status(200).json({ success: true, message: `Knowledge entry has been added` });
  }

  return {
    createKnowledgeBase,
    deleteKnowledgeBase,
    updateKnowledgeEntry,
    deleteKnowledgeEntry,
    deleteKnowledgeEntryDocument,
    getKnowledgeCollection,
    getKnowledgeEntry,
    addKnowledgeEntry,
    getKnowledgeBase,
  };
}

export default knowledgeController;
