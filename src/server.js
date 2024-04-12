const express = require("express");
const path = require('path');
const cron = require('node-cron');
const cors = require("cors");
const { readJSONFile, getAllFilePaths, deleteJSONFile } = require('./utils/jsonReader');
const { insertFAQsToDatabase } = require('./node_nlp/feats/manageFAQs');
const { processMessage, getFrequentlyAskedQuestion, loadOrCreateModel } = require('./node_nlp/nlp');
const { createKnowledgeBase, insertKnowledgeTrainingData, deleteKnowledgeBase, deleteTrainingData } = require('./utils/knowledgeManager');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;


// Server Middleware
app.use('/admin', express.static(path.join(__dirname, '../admin')));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// * Server route and handler

// route to send a message
app.get("/bot", async (req, res) => {
  try {
    const { message } = req.query;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    processMessage(message)
        .then(response => {
          res.json(response);
        })
        .catch(error => {
          res.status(500).json({ error: '⚠️ Error encountered while processing message' });
        });
  } 
  catch (error) {
    console.error("Error processing message:", error);
    return res.status(500).json({ error: "⚠️ Internal server error" });
  }
});
// route to get faqs
app.get('/bot/faq', (req, res) => {
  const faq = getFrequentlyAskedQuestion();
  res.send(faq);
})
// route to trigger training
app.get('/bot/train', async (req, res) => {
  await deleteJSONFile('./model.nlp');
  setTimeout(async () => {
  const status = await loadOrCreateModel();
  console.log(status);
  res.send(status);
  }, 1000);
}); 
// route to get all knowledge data
app.get('/bot/getKnowledge', async (req, res) => {
  try {
    console.log('gettings knowledge');
    let allKnowledgeData = []
    const filePaths = await getAllFilePaths('./knowledge');
    for (const filePath of filePaths) {
      const data = readJSONFile(filePath);
      allKnowledgeData.push(data);
    }
    res.json(allKnowledgeData);
  } catch (error) {
    console.log('Errpr occured when getting all knowledege ', error);
  }
});
// route to add a training data
app.post('/bot/addTrainingData', async (req, res) => {
  try {
    const { knowledgeIndex, knowledgeName, ...trainingData } = req.body;
    trainingData.documents = trainingData.documents.split(',').map(item => item.trim());
    const filePaths = await getAllFilePaths('./knowledge');
    if (knowledgeIndex < 0 || knowledgeIndex >= filePaths.length) {
      throw new Error('Invalid knowledge index');
    }
    await insertKnowledgeTrainingData(filePaths[knowledgeIndex], trainingData)
    console.log('Adding knowledge succesful');
    res.status(200).json({ success: true, message: 'Training data added successfully' });
  } catch (error) {
    console.error('Addding knowledge fail: ', error);
    res.status(404).json({ success: false, message: 'Failed adding training data' });
  } 
});
// route to add a knowledge base
app.post('/bot/addKnowledgeBase/', (req, res) => {
  try {
    const { knowledgeIndex, knowledgeName, ...trainingData } = req.body;
    trainingData.documents = trainingData.documents.split(',').map(item => item.trim());
    const pathTemplate = `./knowledge/${knowledgeName}.json`
    console.log(pathTemplate);
    console.log(trainingData);
    createKnowledgeBase(pathTemplate, [trainingData]);
    res.status(200).json({ success: true, message: 'Knowledge Base added successfully' });
  } catch (error) {
    console.log('error adding knowledge', error);
    res.status(404).json({ success: false, message: 'Failed adding Knowledge Base' });
  }
});
app.delete('/bot/deleteKnowledgeBase/',async (req, res) => {
  try {
    const { knowledgeBaseIndex } = req.body;
    const filePaths = await getAllFilePaths('./knowledge');
    const knowledgePath = filePaths[knowledgeBaseIndex]
    deleteKnowledgeBase(knowledgePath)
    res.status(200).json({ success: true, message: 'Knowledge Base deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Failed deleting Knowledge Base' });
    
  }
});
app.delete('/bot/deleteTrainingData/',async (req, res) => {
  try {
    const { knowledgeBaseIndex, dataIndex } = req.body;
    const filePaths = await getAllFilePaths('./knowledge');
    const knowledgePath = filePaths[knowledgeBaseIndex];
    console.log(`We will delete training data from ${knowledgePath} with index ${dataIndex}`);
    deleteTrainingData(knowledgePath, dataIndex)
    res.status(200).json({ success: true, message: 'Knowledge Base deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Failed deleting Knowledge Base' });
  }
});


// CRON TASKS
/* 
! NOT SURE YET IF THIS 100% WORKS
! BUT SO FAR IT DOES THE JOB, IT UPDATES THE DB EVERY 10 MINS
! CONFIGURE THE FORMAT AS YOU FIT SINCE WE ARE STILL IN DEV
*/ 
cron.schedule('*/10 * * * *', () => {
  console.log('Dev mode no fetching to DB!');
  // insertFAQsToDatabase();
});

// Start server
const startServer = () => {
  app.listen(port, () => {
    console.log(`🚀 Server is listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
 
