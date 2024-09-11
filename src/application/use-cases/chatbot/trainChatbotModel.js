function trainChatbotModel(chatbot){

  const execute = async () => {
    await chatbot.trainModel()
  }
  return {execute}
}

export default trainChatbotModel