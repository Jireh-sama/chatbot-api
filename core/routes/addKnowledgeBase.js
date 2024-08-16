const express = require('express')
const { createKnowledgeBase } = require('@nlp')
const router = express.Router()

router.post('/bot/knowledge-base/',async (req, res) => {
  try {
    const { knowledgeName, defaultDataEntry } = req.body;
    await createKnowledgeBase(knowledgeName, defaultDataEntry)
    console.log('Knowledge Base added successfully');
    res.status(200).json({ success: true, message: 'Knowledge Base added successfully' });
  } catch (error) {
    console.log('Error creating knowledge base', error);
    res.status(500).json({ success: false, message: 'Failed to create knowledge base' });
  }
});

module.exports = router
