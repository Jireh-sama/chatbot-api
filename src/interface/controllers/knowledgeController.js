import { green, red, yellow } from "colorette";

function knowledgeDataController(
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
    try {
      const { knowledgeBaseName, knowledgeEntry } = req.body;
      await createKnowledgeBaseUseCase.execute(
        knowledgeBaseName,
        knowledgeEntry
      );
      console.log('Successfully created knowledge base: ', knowledgeBaseName);
      return res
        .status(201)
        .json({
          success: true,
          message: `Knowledge Base: ${knowledgeBaseName} successfully created`,
        });
    } catch (error) {
      if (error.message === "Knowledge base already exist") {
        console.error(yellow(error.message));
        return res.status(400).json({ success: false, message: error.message });
      }
      if (error.code === 11000) {
        const errMessage = formatDuplicateKeyError(error.message);
        console.error(red(errMessage));
        return res.status(400).json({ success: false, message: errMessage });
      }
      // console.error(red(error.message || error));
      console.error(red(`Unknown errpr: ${error.code}`));
      return res
        .status(500)
        .json({ success: false, message: `Internal server error` });
    }
  };

  const getKnowledgeBase = async (req, res) => {
    try {
      const knowledgeBase = await getKnowledgeBaseUseCase.execute();
      // console.log(yellow('Get knowledge collection'));
      return res.status(200).json({ success: true, knowledgeBase });
    } catch (error) {
      console.error(red(error.message || error));
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  const getKnowledgeCollection = async (req, res) => {
    try {
      const knowledgeCollection = await getKnowledgeCollectionUseCase.execute();
      console.log(yellow('Get knowledge collection'));
      return res.status(200).json({ success: true, knowledgeCollection });
    } catch (error) {
      console.error(red(error.message || error));
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  const getKnowledgeEntry = async (req, res) => {
    try {
      const { knowledgeBase } = req.params
      const knowledgeEntry = await getKnowledgeEntryUseCase.execute(knowledgeBase);
      // console.log(yellow('Get knowledge collection'));
      return res.status(200).json({ success: true, knowledgeEntry });
    } catch (error) {
      console.error(red(error.message || error));
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  const deleteKnowledgeBase = async (req, res) => {
    try {
      const { knowledgeBaseName } = req.params;
      await deleteKnowledgeBaseUseCase.execute(knowledgeBaseName);
      return res
        .status(200)
        .json({
          success: true,
          message: `Knowledge base ${knowledgeBaseName} deleted`,
        });
    } catch (error) {
      if (error.message) {
        console.error(red(error.message || error));
        return res.status(400).json({ success: false, message: error.message });
      }
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  const updateKnowledgeEntry = async (req, res) => {
    try {
      const { knowledgeBaseName, knowledgeEntryIndex, updatedKnowledgeEntry } = req.body;
      await updateKnowledgeEntryUseCase.execute(knowledgeBaseName, knowledgeEntryIndex, updatedKnowledgeEntry);
      console.log(green(`Successfully updated the knowledge entry at knowledge base: ${knowledgeBaseName}, index: ${knowledgeEntryIndex}`));
      return res
        .status(200)
        .json({
          success: true,
          message: `Knowledge entry updated`,
        });
    } catch (error) {
      if (error.message) {
        console.error(red(error.message || error));
        return res.status(400).json({ success: false, message: `Failed to update knowledge entry: ${error.message}` });
      }
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  const deleteKnowledgeEntry = async (req, res) => {
    try {
        console.log('deleteKnowledgeEntry');
      const { knowledgeBaseName, knowledgeEntryIndex } = req.body;
      await deleteKnowledgeEntryUseCase.execute(knowledgeBaseName, knowledgeEntryIndex)
      console.log(green(`Successfully deleted the knowledge entry at knowledge base: ${knowledgeBaseName}, index: ${knowledgeEntryIndex}`));
      return res.status(200).json({ success: true, message: 'Knowledge entry deleted' })
    } catch (error) {
      if (error.message) {
        console.error(red(error.message || error));
        return res.status(400).json({ success: false, message: `Failed to delete knowledge entry: ${error.message}` });
      }
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  const deleteKnowledgeEntryDocument = async (req, res) => {
    try {
      console.log('correct');
      const { knowledgeEntryIntent, documentValue } = req.body;
      await deleteKnowledgeEntryDocumentUseCase.execute(knowledgeEntryIntent, documentValue)
      console.log('Delete knowledge entry doc');
      return res.status(200).json({ success: true, message: 'Knowledge entry document deleted' })
    } catch (error) {
      if (error.message) {
        console.error(red(error.message || error));
        return res.status(400).json({ success: false, message: `Failed to delete knowledge entry document: ${error.message}` });
      }
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  const addKnowledgeEntry = async (req, res) => {
    try {
      const { knowledgeBaseName, knowledgeEntry } = req.body
      await addKnowledgeEntryUseCase.execute(knowledgeBaseName, knowledgeEntry)
      console.log(green(`Successfully added a new knowledge entry at knowledge base: ${knowledgeBaseName} `));
      return res.status(200).json({ success: true, message: `Knowledge entry has been added` });
    } catch (error) {
      if (error.message) {
        console.error(red(error.message || error));
        return res.status(400).json({ success: false, message: `Failed to add new knowledge entry: ${error.message}` });
      }
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  return {
    createKnowledgeBase,
    deleteKnowledgeBase,
    updateKnowledgeEntry,
    deleteKnowledgeEntry,
    getKnowledgeCollection,
    addKnowledgeEntry,
  };
}

export default knowledgeDataController;
