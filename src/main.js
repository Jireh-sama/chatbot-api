import 'dotenv/config'
import startServer from'./app.js';
import { chatbotClient } from './infrastructure/service/index.js';

const initialize = async () => {
    await chatbotClient.initialize()
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


