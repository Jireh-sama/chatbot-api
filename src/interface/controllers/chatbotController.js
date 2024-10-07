function chatbotController(processUserQueryUseCase, trainChatbotUseCase) {
  
  const processUserQuery = async (req, res) => {
    const { userQuery } = req.body;
    const response = await processUserQueryUseCase.execute(userQuery)
    console.log(`User query successfully handled, Query: ${response.utterance}`);
    return res.status(200).json({ success: true, response })
  }

  const trainChatbot = async (_req, res) => {
    await trainChatbotUseCase.execute()
    console.log('Model trained successfully');
    res.status(200).json({ success: true, response: 'Model trained successfully' })
  }

  return { processUserQuery, trainChatbot }
}

export default chatbotController