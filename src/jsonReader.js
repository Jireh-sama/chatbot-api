const fs = require("fs");
const { red } = require('colorette');

const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(red("⚠️ Error reading json file:"), err);
    return null;
  }
};

const updateJSONFile = (filePath, newData) => {
  try {
    // Read existing JSON data from file
    const prevData = readJSONFile(filePath);
  
    const existingData = prevData.find(data => data.answer === newData.answer);
  
    if (!existingData) {
      prevData.push(newData)
      fs.writeFileSync(filePath, JSON.stringify(prevData));
    } else {
      existingData.frequency++;
    }
    fs.writeFile(filePath, JSON.stringify(prevData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
    });
    
  } catch (error) {
    console.error('Failed updating file ', error)
  }

};

const getObjectFromMatchingValue = (filePath, searchValue) => {
  try {
    const jsonData = readJSONFile(filePath);

    if (!jsonData) {
      throw new Error("Unable to read JSON file");
    }
    
    const foundObject = jsonData.find((obj) => obj.answer === searchValue);

    if (!foundObject) {
      // console.log(red("No matching object found in: "),filePath);
      return null;
    }
    return foundObject;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = {
  readJSONFile,
  updateJSONFile,
  getObjectFromMatchingValue,
};
