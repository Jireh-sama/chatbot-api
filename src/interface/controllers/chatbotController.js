function chatbotController(processUserQueryUseCase, trainChatbotUseCase) {
  
  const processUserQuery = async (req, res) => {
    try {
      const { userQuery } = req.body;
      const response = await processUserQueryUseCase.execute(userQuery)
      console.log(`User query successfully handled, Query: ${response.utterance}`);
      return res.status(200).json({ success: true, response })
    } catch (error) {
      console.log(error.message || error);
      return res.status(500).json({ success: false, response: error.message || error })
    }
  }

  const trainChatbot = async (_req, res) => {
    try {
      await trainChatbotUseCase.execute()
      console.log('Model trained successfully');
      res.status(200).json({ success: true, response: 'Model trained successfully' })
    } catch (error) {
      res.status(500).json({ success: false, response: error.message || error })
    }
  }

  return { processUserQuery, trainChatbot }
}

export default chatbotController