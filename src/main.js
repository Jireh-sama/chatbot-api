import startServer from'./app.js';
import { initializeChatbot } from './application/chatbotServiceManager.js';

const initialize = async () => {
    initializeChatbot()  
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


