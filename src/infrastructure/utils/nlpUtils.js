import { DEFAULT_FALLBACK_RESPONSE, EXCLUSION_LIST, FALLBACK_PATTERNS, FALLBACK_RESPONSE } from "../config/nlpManagerConfig.js";
import { capitalizePhrase } from "./formatUtils.js";
import nlp from 'compromise'
import { logMessage } from "./loggingUtils.js";

export const classifyFallback = (doc) => {
  const categoryScores = {
    direction: 0,
    information: 0,
    person: 0,
    social: 0,
  };

  for (const [category, patterns] of Object.entries(FALLBACK_PATTERNS)) {
    patterns.forEach((pattern) => {
      const regex = new RegExp(`\\b${pattern}\\b`, "i"); // Match the entire pattern
      if (doc.text().match(regex)) {
        console.log(`Matched: "${pattern}" in category: ${category}`);
        categoryScores[category] += 1; // Increment the score for a match
      }
    });
  }

  console.log(categoryScores);

  // Find the category with the highest score
  const [bestCategory, bestScore] = Object.entries(categoryScores).reduce(
    (best, current) => (current[1] > best[1] ? current : best),
    ["", 0]
  );
  return bestScore > 0 ? bestCategory : "None";
};

export const generateDynamicFallbackResponse = (query) => {
  const doc = nlp(query);

  // Remove symbols from the query
  const sanitizedQuery = query.replace(/[!?]/g, "");

  // Recreate the NLP doc from the sanitized query
  const sanitizedDoc = nlp(sanitizedQuery);


  // Extract nouns and filter out exclusions
  let nouns = sanitizedDoc
    .nouns()
    .out("array")
    .filter((noun) => {
      return !EXCLUSION_LIST.some((exclusion) =>
        noun.toLowerCase().includes(exclusion.toLowerCase())
      );
    });

  // Capitalize each multi-word noun phrase
  nouns = nouns.map(capitalizePhrase);

  let mainSubject;
  let prepositions = sanitizedDoc.match('#Preposition').out('array');
  let context = sanitizedDoc.match('#Preposition? #Noun+').out('text');
  const fallback = classifyFallback(sanitizedDoc)

  logMessage(`Prepositions: ${prepositions}`);
  logMessage(`Context: ${context}`);
  console.log(`Nouns: ${nouns}`);
  logMessage(`Fallback: ${fallback}`);

  if (nouns.length === 0) {
    mainSubject = 'what you are asking about';
  } else if (nouns.length === 1) {
    mainSubject = `the ${nouns[0]}`;
  } else {
    let lastNoun = nouns.pop();
    mainSubject = `the ${nouns.join(', ')} and ${lastNoun}`;
  }

  const fallbackResponse = fallback !== 'None' ? FALLBACK_RESPONSE[fallback](mainSubject) : DEFAULT_FALLBACK_RESPONSE

  return fallbackResponse
};
