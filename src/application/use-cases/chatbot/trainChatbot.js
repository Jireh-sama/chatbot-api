import fs from 'fs/promises';
import { modelFilePath } from '#src/infrastructure/config/paths.js';
import { getCurrentTime } from '#src/infrastructure/utils/timeUtils.js';
import { insertDocument } from '#src/infrastructure/persistence/database/firebase/client.js';

function trainChatbot(chatbot){
  const execute = async () => {
    // await fs.unlink(modelFilePath, (err) => {
    //   if (err) throw err
    // })
    await chatbot.train()
    const timeFinishedTraining = getCurrentTime()
    await insertDocument('profile', { timeFinishedTraining })
  }
  return {execute}
}

export default trainChatbot