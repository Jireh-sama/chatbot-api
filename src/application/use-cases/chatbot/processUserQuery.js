function processUserQuery(chatbot) {
  const execute = async (query) => {
    if (!query) {
      throw new Error('A Query is required to process and deliver a response')
    }
    const response = await chatbot.processUserQuery(query)
    // Do some logic to manipulating response here...
    return response;
  }

  return {execute}
}
export default processUserQuery