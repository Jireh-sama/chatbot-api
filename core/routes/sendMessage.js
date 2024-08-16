const express = require("express");
const { sendMessage } = require("@nlp");

const router = express.Router();

router.post("/bot", async (req, res) => {
  try {
    const { message } = req.query;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    sendMessage(message)
      .then((response) => {
        res.json(response.answer);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: `⚠️ Error encountered while processing message: ${error}` });
      });
  } catch (error) {
    console.error("Error processing message:", error);
    return res.status(500).json({ error: "⚠️ Internal server error" });
  }
});

module.exports = router