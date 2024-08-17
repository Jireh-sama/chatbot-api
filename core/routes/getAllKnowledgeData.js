const express = require('express')
const { getAllKnowledge } = require('@nlp')
const router = express.Router()

router.get('/bot/knowledge-data/', async (req, res) => {
  try {
    console.log('gettings knowledge');
    const allKnowledgeData = await getAllKnowledge()
    return res.status(200).json({ success: true, knowledgeData: allKnowledgeData});
  } catch (error) {
    console.log('Error occured when getting all knowledege ', error);
    return res.status(500).json({ success: false, message: 'Failed to get Knowledge Data Internal Server Error' })
  }
})

module.exports = router

