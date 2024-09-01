function chatbotController(processUserQueryUseCase) {
  
  const processUserQuery = async (req, res) => {
    try {
      const { userQuery } = req.body;
      console.log('start handlingi query: ', userQuery);
      const response = await processUserQueryUseCase.execute(userQuery)
      console.log('bot response: ',response);
      return res.status(200).json({ success: true, response: response })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, response: error.message || error })
    }
  }

  // const trainChatbot = async (_req, res) => {
  //   try {
  //     await trainChatbotUseCase.execute()
  //     console.log('Model trained successfully');
  //   } catch (error) {
  //     res.status(500).json({ success: false, response: error.message || error })
  //   }
  // }

  return { processUserQuery }
}

export default chatbotController