
const notEnglishAndTagalog = (response, utteranceLanguage) => {
  if (utteranceLanguage !== 'english' && utteranceLanguage !== 'tagalog') {
    const fallbackResponses = [
      "I'm sorry, I currently only support English. Can you please ask your question in English?",
      "Apologies, my language skills are limited to English at the moment. Could you rephrase your question in English?",
      "Unfortunately, I can only understand English right now. Could you please translate your query into English?",
    ];
    response.answer = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return true;
  }
  return false;  
}
const isTagalog = (response, utteranceLanguage) => {
  if (utteranceLanguage === 'tagalog') {
    // Do something specific for Tagalog language
    response.answer = "Pasensya na, ngunit sa ngayon ay hindi ko pa kayang maunawaan ang Tagalog. Maaari mo bang itanong ang iyong katanungan sa Ingles?";
    return true;
  }
  return false;
}
const noAnswer = (response, responseIntent) => {
  if (!response.answer || responseIntent === 'none') {
    const fallbackResponses = [
      "Oh, it seems I haven't quite gotten to that part in my learning journey yet! Is there something else I can help you with instead?",
      "I'm sorry, I'm still learning and may not have the answer to that question just yet. Is there anything else I can assist you with?",
      "Interesting! It seems I haven't learned about that just yet. What else can I assist you with?"
    ]
    response.answer = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return true;
  }
  return false;
}
const utteranceToShort = (response, responseIntent) => {
  const input = response.utterance.trim().split(/\s+/);
  if (input.length <= 2 && !responseIntent.includes('salutation') ) {
    response.answer = 'Hmm, it seems like your input is a bit short for me to process. Could you please give me a little more to work with?'
    return true;
  }
  return false;
}
module.exports = {
  notEnglishAndTagalog,
  isTagalog,
  noAnswer,
  utteranceToShort,
}