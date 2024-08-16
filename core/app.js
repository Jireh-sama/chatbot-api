const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { sendMessage, getAllKnowledgeData, addKnowledgeBase, addKnowledgeEntry, deleteKnowledgeBase, deleteKnowledgeEntry, updateKnowledgeEntry } = require('./routes')
 
const app = express();


// Server Middleware
app.use('/admin', express.static(path.join(__dirname, '../admin')));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/api', sendMessage)
app.use('/api', getAllKnowledgeData)
app.use('/api', addKnowledgeBase)
app.use('/api', addKnowledgeEntry)
app.use('/api', deleteKnowledgeBase)
app.use('/api', deleteKnowledgeEntry)
app.use('/api', updateKnowledgeEntry)





module.exports = app