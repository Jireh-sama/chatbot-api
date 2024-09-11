import express from "express";
import ChatbotController from "../controllers/chatbotController.js";
import ProcessUserQuery from "../../application/use-cases/chatbot/processUserQuery.js";
import { getChatbotInstance } from '#infrastructure/persistence/chatbot/chatbotServiceManager.js'

const router = express.Router()

const processUserQuery = ProcessUserQuery(getChatbotInstance());
const chatBotController = ChatbotController(processUserQuery);
  
// Route for user
router.post('/chatbot/query', (req, res) => chatBotController.processUserQuery(req, res))

// Route for admin
router.post('/chatbot/admin-query')

// router.use('/chatbot/train', (req, res) => chatBotController.trainChatbot(req, res))



export default router