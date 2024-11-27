function archiveController(
  getArchiveDocumentUseCase,
  removeKnowledgeBaseUseCase,
  removeKnowledgeEntryUseCase,
  restoreKnowledgeBaseUseCase,
  restoreKnowledgeEntryUseCase,
) {
 
  const handleGetArchiveData = async (req, res) => {
    const { archiveType } = req.params;
    const archiveData = await getArchiveDocumentUseCase.execute(archiveType);

    res.status(200).json({ success: true, document: archiveData });
  };

  const handleRemoveKnowledgeBase = async (req, res) => {
    const { knowledgeBaseId } = req.params
    if (!knowledgeBaseId) {
      throw new CustomError('Id is required', 400)
    }
    await removeKnowledgeBaseUseCase.execute(knowledgeBaseId)
    res.status(200).json({success: true, message: `Knoledge base has been permanently removed`})
  };

  const handleRemoveKnowledgeEntry = async (req, res) => {
    const { knowledgeEntryId } = req.params
    await removeKnowledgeEntryUseCase.execute(knowledgeEntryId)

    res.status(200).json({success: true, message: `Knoledge entry has been deleted`})
  }

  const handleRestoreKnowledgeBase = async (req, res) => {
    const { knowledgeBaseId } = req.body
    if (!knowledgeBaseId) {
      throw new CustomError('Id is required', 400)
    }
    await restoreKnowledgeBaseUseCase.execute(knowledgeBaseId)
    res.status(200).json({success: true, message: `Knoledge base has been restored`})
  };

  const handleRestoreKnowledgeEntry = async (req, res) => {
    const { knowledgeEntryId } = req.body
    await restoreKnowledgeEntryUseCase.execute(knowledgeEntryId)
    res.status(200).json({success: true, message: `Knoledge entry has been restored`})
  };

  return {
    handleGetArchiveData,
    handleRemoveKnowledgeBase,
    handleRemoveKnowledgeEntry,
    handleRestoreKnowledgeBase,
    handleRestoreKnowledgeEntry,
  };
}

export default archiveController