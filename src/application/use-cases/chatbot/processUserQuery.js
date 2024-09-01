function processUserQuery(chatbot) {
  const execute = async (query) => {
    const response = await chatbot.processUserQuery(query)
    // Do some logic to manipulating response here...
    return response;
  }

  return {execute}
}
export default processUserQuery