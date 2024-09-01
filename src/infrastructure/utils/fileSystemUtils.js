import fs from 'fs/promises'

// This is a function to get all the filepaths inside the specified folder or directory
export const getAbsolutePathListFromDirectory = async (directory) => {
  try {
    // This only contains the file names not the absolute path
    const fileNameList = await fs.readdir(directory);
    const absolutePathList = fileNameList.map(fileName => `${directory}${fileName}`);
    return absolutePathList;
  } catch (error) {
    console.error("Error getting file paths: ", error);
    return []
  }
}