const fs = require("fs");
const path = require('path');
const { red } = require('colorette');

const createJSONFile = (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error when creating a new file: ', err);
      } else {
        console.log('Successfully created a new File');
      }
    });
  } catch (error) {
    console.error('Error when creating a new file: ', error);
  }
}

const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(red("⚠️ Error reading json file:"), err);
    return null;
  }
};

const updateJSONFile = (filePath, data) => {
  try {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      }else {
        console.log("JSON file has been updated");
      }
    });
  } catch (error) {
    console.error(`Error updating JSON Filepath:${filePath} `, error);
  }
} 

const deleteJSONFile = (filePath) => {

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("File not found");
      return;
    }
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  });

}
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
const getAllFilePaths = (folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    const filePaths = files.map(file => `${folderPath}/${file}`);
    return filePaths;
} catch (error) {
    throw error;
}
}

module.exports = {
  createJSONFile,
  readJSONFile,
  updateJSONFile,
  deleteJSONFile,
  getAllFilePaths,
  getObjectFromMatchingValue,
};
