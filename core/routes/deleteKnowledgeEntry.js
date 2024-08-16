const express = require("express");
const { deleteKnowledgeEntry } = require("@nlp");
const router = express.Router();

router.delete("/bot/training-data", async (req, res) => {
  try {
    const { knowledgeBaseName, knowledgeEntryIndex } = req.body;
    await deleteKnowledgeEntry(knowledgeBaseName, knowledgeEntryIndex);
    console.log("Knowledge Base deleted successfully");
    res
      .status(200)
      .json({ success: true, message: "Knowledge Base deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Failed deleting Knowledge Base" });
  }
});

module.exports = router
