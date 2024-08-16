const express = require('express')
const { deleteKnowledgeBase } = require('@nlp')

const router = express.Router()

router.delete('/bot/knowledge-base/',async (req, res) => {
  try {
    const { knowledgeBaseName } = req.body;
    await deleteKnowledgeBase(knowledgeBaseName)
    console.log('Knowledge Base deleted successfully');
    res.status(200).json({ success: true, message: 'Deleted Knowledge Base successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Failed deleting Knowledge Base' });
    
  }
})

module.exports = router
