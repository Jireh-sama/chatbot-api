export const formatDuplicateKeyError = (errorMessage) => {
  // Use a regular expression to extract the key and value from the error message
  const match = errorMessage.match(/dup key: { (.*): "(.*)" }/);
  
  if (match) {
    const field = match[1];   // Extract the field name
    const value = match[2];   // Extract the field value
    return `Duplicate key error: The field '${field}' with value '${value}' already exists.`;
  }
  
  return 'Duplicate key error: Unable to extract key and value from the error message.';
};


export const extractQuotedText = (errorMessage) => {
  const match = errorMessage.match(/"([^"]*)"/);
  return match ? match[1] : null;
};