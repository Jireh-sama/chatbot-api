const { green, red } = require('colorette');
const { getObjectFromMatchingValue } = require("../../utils/jsonReader");

const matchQuestionToObject = (searchValue, filePaths) => {

  let foundObject = null;
  for (let file of filePaths) {
    foundObject = getObjectFromMatchingValue(file, searchValue);
    if (foundObject) {
      console.log(green('🔍 Found a value that matches the search value'));
      return foundObject;
    }
  }
  if (!foundObject) {
    console.log(red('⚠️ No Matching value found'));
  }
};

module.exports = matchQuestionToObject;