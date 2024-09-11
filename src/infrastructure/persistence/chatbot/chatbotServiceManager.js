import ChatbotService from "#domain/services/chatbotService.js";
import { NlpManager } from "node-nlp";
import { nlpManagerConfig } from "#infrastructure/config/nlpManagerConfig.js";
import { modelFilePath, defaultKnowledgeDirectory } from "#infrastructure/config/paths.js";
import { getAbsolutePathListFromDirectory } from "#infrastructure/utils/pathUtils.js";
import fs from 'fs/promises'

const manager = new NlpManager(nlpManagerConfig)

const chatbotService = ChatbotService(manager, async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
})

async function initializeChatbot() {
  try {
    await chatbotService.loadModel(modelFilePath);
    console.log("Model loaded successfully!");
  } catch (error) {
    console.error("Model does not exist, training a new one...");
    const knowledgeBasePathCollection = await getAbsolutePathListFromDirectory(
      defaultKnowledgeDirectory
    );
    await chatbotService.trainModel(knowledgeBasePathCollection, modelFilePath);
  }
}

function getChatbotInstance() {
  if(!chatbotService){
    console.log('instance exist');
  }
  return chatbotService;
}

export { initializeChatbot, getChatbotInstance }