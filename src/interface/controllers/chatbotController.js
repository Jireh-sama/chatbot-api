function chatbotController(
  processUserQueryUseCase,
  trainChatbotUseCase
) {
  const processUserQuery = async (req, res) => {
    const { userQuery } = req.body;
    const response = await processUserQueryUseCase.execute(userQuery);

    // await updateKnowledgeEntryFrequencyUseCase.execute(response.intent)
    res.status(200).json({ success: true, response });
  };

  const trainChatbot = async (_req, res) => {
    const timeFinishedTraining = await trainChatbotUseCase.execute();
    console.log("Model trained successfully");
    res
      .status(200)
      .json({
        success: true,
        response: `Model trained successfully: ${timeFinishedTraining}`,
      });
  };

  return { processUserQuery, trainChatbot };
}

export default chatbotController;
