const express = require('express')
const { getAllKnowledge } = require('@nlp')
const router = express.Router()

router.get('/bot/knowledge-data/', async (req, res) => {
  try {
    console.log('gettings knowledge');
    res.json(await getAllKnowledge());
  } catch (error) {
    console.log('Error occured when getting all knowledege ', error);
  }
})

module.exports = router

