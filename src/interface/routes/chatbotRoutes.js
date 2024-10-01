import express from "express";
import ChatbotController from "../controllers/chatbotController.js";
import { chatbotClient } from "#src/infrastructure/service/index.js";

import ProcessUserQuery from "#src/application/use-cases/chatbot/processUserQuery.js";
import TrainChatbot from "#src/application/use-cases/chatbot/trainChatbot.js";

const router = express.Router()

const processUserQuery = ProcessUserQuery(chatbotClient);
const trainChatbot = TrainChatbot(chatbotClient);

const chatBotController = ChatbotController(processUserQuery, trainChatbot);
  
router.post('/query', (req, res) => chatBotController.processUserQuery(req, res))
router.post('/train', (req, res) => chatBotController.trainChatbot(req, res))

export default router