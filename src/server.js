const express = require("express");
const cron = require('node-cron');
const cors = require("cors");
const { insertFAQsToDatabase } = require('./node_nlp/feats/manageFAQs');
const { processMessage, getFrequentlyAskedQuestion, trainModel } = require('./node_nlp/nlp');

const app = express();
const port = 3001;

// Server Middleware
app.use(
  cors({
    origin: "*",
  })
);

// Server route and handler
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
app.get('/bot/faq', (req, res) => {
  const faq = getFrequentlyAskedQuestion();
  res.send(faq);
})
app.get('/bot/train', async (req, res) => {
  const status = await trainModel();
  console.log(status);
  res.send(status);
}); 

// CRON TASKS
/* 
! NOT SURE YET IF THIS 100% WORKS
! BUT SO FAR IT DOES THE JOB, IT UPDATES THE DB EVERY 10 MINS
! CONFIGURE THE FORMAT AS YOU FIT SINCE WE ARE STILL IN DEV
*/ 
cron.schedule('*/10 * * * *', () => {
  // console.log('Dev mode no fetching to DB!');
  insertFAQsToDatabase();
});

// Start server
const startServer = () => {
  app.listen(port, () => {
    console.log(`🚀 Server is listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
 
