import { getCurrentTime } from '#src/infrastructure/utils/timeUtils.js';
import { insertDocument } from '#src/infrastructure/persistence/database/firebase/client.js';

function trainChatbot(chatbot){
  const execute = async () => {
    await chatbot.train()
    const timeFinishedTraining = getCurrentTime()
    await insertDocument('profile', { timeFinishedTraining })
  }
  return {execute}
}

export default trainChatbot