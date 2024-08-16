const express = require('express')
const { addKnowledgeEntry } = require('@nlp')
const router = express.Router();

router.post('/bot/training-data', async (req, res) => {
  try {
    const { knowledgeName, newData } = req.body;
    await addKnowledgeEntry(knowledgeName, newData);
    console.log('Training data added successfully');
    res.status(200).json({ success: true, message: 'Training data added successfully' });
  } catch (error) {
    console.error('Addding knowledge fail: ', error);
    res.status(404).json({ success: false, message: 'Failed adding training data' });
  } 
});

module.exports = router