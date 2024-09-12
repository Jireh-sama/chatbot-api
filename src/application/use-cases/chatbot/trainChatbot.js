function trainChatbot(chatbot){
  const execute = async () => {
    await chatbot.train()
  }
  return {execute}
}

export default trainChatbot