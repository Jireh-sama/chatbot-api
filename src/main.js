import 'dotenv/config'
import startServer from'./app.js';
import { initializeChatbot } from '#infrastructure/persistence/chatbot/chatbotServiceManager.js';

const initialize = async () => {
    await initializeChatbot()  
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


