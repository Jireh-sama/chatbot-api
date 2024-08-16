const { guessLanguage } = require("./languageDetection");
const {
  notEnglishFallbackResponses,
  noAnswerFallbackResponses,
} = require("../nlp_libs/fallBackResponses");

function validateResponse(utterance, intent, response){
    const responseLanguage = guessLanguage(utterance);
    console.log("intent: ", intent);
    console.log("language: ", responseLanguage);

    if (isNotEnglish(responseLanguage)) {
      return (response =
        notEnglishFallbackResponses[
          Math.floor(Math.random() * notEnglishFallbackResponses.length)
        ]);
    }
    if (noAnswer(intent)) {
      return (response =
        noAnswerFallbackResponses[
          Math.floor(Math.random() * noAnswerFallbackResponses.length)
        ]);
    }
    return response;
};

const isNotEnglish = (responseLanguage) => {
  if (responseLanguage !== "english") return true;
  return false;
};

const noAnswer = (intent) => {
  if (intent.toLowerCase() === "none") return true;
  return false;
};


module.exports = validateResponse;
