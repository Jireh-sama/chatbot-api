const generateDynamicResponse = (intent, responseData) => {
  const baseIntent = getBaseIntent(intent);
  const template = getResponseTemplate(baseIntent);
  const dynamicResponse = interpolateResponse(template, responseData);
  
  return dynamicResponse;
}

const hasPeriod = (str) => /\./.test(str);

const getBaseIntent = (intent) => {
  try {
    if (!hasPeriod(intent)) {
      throw new Error('String does not contain a period');
    }
    const baseIntent = intent.split(".")[0];
    return baseIntent;
  } catch (error) {
    console.log('An error occured while extracting base intent: ', error.message);
  }
};

const getResponseTemplate = (intent) => {
  let responseTemplate = "";

  switch (intent) {

    // * Question Intent Formats
    case "question":
      const questionResponses = [
        "As of my latest knowledge, {{answer}}",
        "Here's what I know, {{answer}}",
        "Based on what I've learned, {{answer}}",
      ];
      responseTemplate =
        questionResponses[Math.floor(Math.random() * questionResponses.length)];
      break;

    // * Request Intent Formats
    case "request":
      const requestResponses = [
        "Certainly, {{answer}}",
        "Right away, {{answer}}",
      ];
      responseTemplate =
        requestResponses[Math.floor(Math.random() * requestResponses.length)];
      break;
    

    default:
      responseTemplate = "{{answer}}";
      break;
  }
  return responseTemplate;
};

// Function to interpolate dynamic content into response template
const interpolateResponse = (template, data) => {
  return template.replace(/{{(\w+)}}/g, (match, key) => {
    return data[key] || match;
  });
};

module.exports = generateDynamicResponse;