const express = require("express");
const cors = require("cors");
const { processMessage } = require('./node_nlp/nlp');

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
          res.status(500).json({ error: 'Error processing message' });
        });
  } 
  catch (error) {
    console.error("Error processing message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.get('/bot/faq', (req, res) => {
  res.send('FAQ')
})

// Start server
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
 
