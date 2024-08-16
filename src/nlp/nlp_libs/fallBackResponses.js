const notEnglishFallbackResponses = [
  "I'm sorry, I currently only support English. Can you please ask your question in English?",
  "Apologies, my language skills are limited to English at the moment. Could you rephrase your question in English?",
  "Unfortunately, I can only understand English right now. Could you please translate your query into English?",
]

const noAnswerFallbackResponses = [
  "Oh, it seems I haven't quite gotten to that part in my learning journey yet! Is there something else I can help you with instead?",
  "I'm sorry, I'm still learning and may not have the answer to that question just yet. Is there anything else I can assist you with?",
  "Interesting! It seems I haven't learned about that just yet. What else can I assist you with?"
]

const messageTooShortFallbackResponses = [
  "It looks like your message is a bit brief. Could you please share a little more detail so I can better assist you?",
  "Thank you for your message. It seems like I need a bit more detail to help you out. Could you please elaborate?",
  "I'd love to assist you further, but it seems your message might be a bit short. Could you share a bit more?"
]

module.exports = {
  notEnglishFallbackResponses,
  noAnswerFallbackResponses,
  messageTooShortFallbackResponses
}