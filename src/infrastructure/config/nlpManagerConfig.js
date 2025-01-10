export const nlpManagerConfig = {
  languages: ["en"],
  nlu: { log: false, useNoneFeature: true },
  forceNER: true,
  autoSave: false,
};

export const nlpModelFileName = "model.nlp";

export const DEFAULT_FALLBACK_RESPONSE =
  "It seems I’m not quite able to understand what you’re looking for. Could you try being more specific or provide additional details to help me assist you better?";
  export const FALLBACK_PATTERNS = {
    direction: [
      // Single Words
      "where",
      "find",
      "near",
      "nearest",
      "locate",
      "located",
      "location",
      "building",
      "entrance",
      "exit",
      "area",
      "hall",
      "floor",
      "wing",
      "map",
      "office",
  
      // Phrases
      "department office",
      "how do I get to",
      "directions to",
      "navigate to",
      "around here",
      "place for",
      "way to",
      "direction to",
      "where is the",
      "nearest department",
      "office for",
      "room number for",
      "inside city hall",
      "how to find",
      "specific department",
      "how to reach",
    ],
    information: [
      // Single Words
      "license",
      "certificate",
      "document",
      "schedule",
      "requirements",
      "forms",
      "fees",
      "services",
      "policies",
      "office hours",
      "permits",
      "registration",
      "application",
  
      // Phrases
      "what is",
      "can you tell me",
      "details about",
      "information on",
      "facts about",
      "describe",
      "explain",
      "data about",
      "tell me more about",
      "give me info on",
      "please explain",
      "specifics on",
      "how to apply for",
      "process for",
      "where to get",
      "requirements for",
      "cost of",
      "needed for",
      "eligibility for",
      "how to obtain",
      "steps to",
      "when is",
    ],
    person: [
      // Single Words
      "person",
      "who",
      "leader",
      "president",
      "mayor",
      "official",
      "councilor",
      "secretary",
      "clerk",
      "staff",
      "employee",
      "manager",
      "officer",
      "representative",
  
      // Phrases
      "name of",
      "who is",
      "identity of",
      "known for",
      "tell me about",
      "famous for",
      "person called",
      "do you know who",
      "can you tell me about",
      "details about",
      "who works at",
      "head of",
      "leader of",
      "responsible for",
      "in charge of",
      "current mayor",
      "city officials",
      "staff for",
      "person in charge of",
    ],
    social: [
      // Single Words
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "tiktok",
      "social",
      "media",
      "youtube",
      "page",
      "channel",
      "platform",
      "profile",
      "account",
      "updates",
      "posts",
  
      // Phrases
      "facebook page",
      "social media account",
      "social links",
      "where is the facebook",
      "social media profiles",
      "official page",
      "social channels",
      "online presence",
      "social updates",
      "follow on",
      "official account",
      "public page",
      "media platforms",
      "social accounts",
      "where to follow",
      "official posts",
    ],
  };
  

export const FALLBACK_RESPONSE = {
  direction: (subject) =>
    `I'm sorry, I couldn't provide detailed directions for ${subject}. If you're looking for a specific department, office, or area within or near City Hall, please visit the information desk located at the main building's entrance for assistance.`,
  information: (subject) =>
    `I apologize, but I couldn't find specific information regarding ${subject}. For general inquiries or further details, please visit the information desk near the entrance of the main building.`,
  person: (subject) =>
    `I couldn't locate any details about ${subject}. If you're searching for a specific individual or information about City Hall's public officials, you can visit the <List of City Officials>{=https://bacoor.gov.ph/city-officials/=} for reference.`,
  social: (subject) =>
    `I'm sorry, I couldn't find specific information about ${subject}. For updates and details about City Hall's social media, please visit their official Facebook page at <Official Page>{=https://web.facebook.com/CityGovtBacoor=}.`,
};


// Define words/phrases to filter out
export const EXCLUSION_LIST = [
  "city hall",
  "bacoor city hall",
];

const languageFallBackResponses = [
  "Unfortunately, I can only understand English. If it's okay with you, could you please rephrase your question in English so I can better assist you?",
  "I'm sorry, but I can only understand English right now. Would you mind asking your question in English so I can help you out?",
  "At the moment, I can only understand English. If you could rephrase your question in English, I’ll do my best to assist you!",
  "I’m afraid I can only understand English for now. Could you kindly rephrase your question in English so I can assist you properly?",
];

export const getLanguageFallBackResponse = () => {
  const index = Math.floor(Math.random() * languageFallBackResponses.length);
  return languageFallBackResponses[index];
};

export const SUPPORTED_LANGUAGES = ["english"];
