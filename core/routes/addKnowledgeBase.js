const express = require('express')
const { red, green } = require("colorette");
const { createKnowledgeBase } = require('@nlp')
const { checkKnowledgeBaseExists } = require('@validators/knowledgeValidator')
const router = express.Router()

router.post('/bot/knowledge-base/',async (req, res) => {
  try {
    const { knowledgeName, defaultDataEntry } = req.body;

    const doesExist = await checkKnowledgeBaseExists(knowledgeName)
    if (doesExist) {
      console.error(red('Knowledge Base already exist'));
      return res.status(400).json({ success: false, message: 'Knowledge Base already exist' });
    }
    await createKnowledgeBase(knowledgeName, defaultDataEntry)
    console.log(green('Knowledge Base added successfully'));
    return res.status(200).json({ success: true, message: `Knowledge Base added successfully` });
  } catch (error) {
    const errorMessage = error.message || 'Failed to create knowledge base';
    console.error(red(`Error creating knowledge base: ${errorMessage}`));
    return res.status(500).json({ success: false, message: 'Failed to create knowledge base' });
  }
});

module.exports = router
