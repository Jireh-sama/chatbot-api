import fs from 'fs/promises';
import { modelFilePath } from '#src/infrastructure/config/paths.js';
function trainChatbot(chatbot){
  const execute = async () => {
    await fs.unlink(modelFilePath, (err) => {
      if (err) throw err
    })
    await chatbot.train()
  }
  return {execute}
}

export default trainChatbot