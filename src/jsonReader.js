const fs = require("fs");

const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading json file:", err);
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
      console.log("Frequency has been updated");
    });
    
  } catch (error) {
    console.error('Failed updating file ', error)
  }

};

const getObjectFromMatchingValue = (filePath, searchValue) => {
  const jsonData = readJSONFile(filePath);

  if (!jsonData) {
    console.error("Unable to read JSON file");
    return;
  }
  
  const foundObject = jsonData.find((obj) => obj.answer === searchValue);

  if (!foundObject) {
    console.log("No matching object Found");
    return null;
  }
  if (foundObject) {
    console.log("Found matching Object");
    return foundObject;
  }
};

module.exports = {
  readJSONFile,
  updateJSONFile,
  getObjectFromMatchingValue,
};
