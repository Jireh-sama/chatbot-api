function initializeModelTraining(chatbot){

  const execute = () => {
    await chatbot.trainModel()
  }
  return {execute}
}