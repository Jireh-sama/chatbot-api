const express = require('express')
const { updateKnowledgeEntry } = require('@nlp')
const router = express.Router()

router.put('/bot/training-data', async (req, res) => {
  try {
    // const {knowledgeBaseIndex, dataIndex, newData} = req.body
    const {knowledgeName, index, newKnowledgeEntry} = req.body
    // Validation
    if (!(newKnowledgeEntry.documents instanceof Array)) 
      res.status(400).json({success: false, message: 'Invalid data format: documents should be an array'})
      
    await updateKnowledgeEntry(knowledgeName, index, newKnowledgeEntry);
    console.log('Training data updated');
    res.status(200).json({ success: true, message: 'Training data updated' });
  } catch (error) {
    console.error('Error updating training data:', error);
    res.status(500).json({ success: false, message: 'Failed to update training data' });
  }
});

module.exports = router