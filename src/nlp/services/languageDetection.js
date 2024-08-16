const { Language } = require("node-nlp");

/**
 * Guesses the language of the given text.
 *
 * @param {string} text - The text to guess the language of.
 * @return {string} The guessed language of the text.
 */
const guessLanguage = (text) => {
  const language = new Language();
  const languageGuessLimit = 3;
  const guess = language.guess(text, null, languageGuessLimit);
  const guessedLanguage = guess[0].language.toLowerCase();
  return guessedLanguage;
}

module.exports = { guessLanguage }