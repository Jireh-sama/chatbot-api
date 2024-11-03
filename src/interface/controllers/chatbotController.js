function chatbotController(processUserQueryUseCase, trainChatbotUseCase, updateKnowledgeEntryFrequencyUseCase, updateQuestionFrequencyUseCase) {
  
  const processUserQuery = async (req, res) => {
    const { userQuery } = req.body;
    const response = await processUserQueryUseCase.execute(userQuery);

    await updateKnowledgeEntryFrequencyUseCase.execute(response.intent);
    res.status(200).json({ success: true, response })
  }

  const trainChatbot = async (_req, res) => {
    const timeFinishedTraining = await trainChatbotUseCase.execute()
    console.log('Model trained successfully');
    res.status(200).json({ success: true, response: `Model trained successfully: ${timeFinishedTraining}` })
  }

  const updateQuestionFrequency = async (_req, res) => {
    await updateQuestionFrequencyUseCase.execute()
    res.status(200).json({ success: true, response: `Updated question frequency` })
  }

  return { processUserQuery, trainChatbot, updateQuestionFrequency }
}

export default chatbotController