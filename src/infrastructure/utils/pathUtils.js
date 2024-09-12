import path from 'path'
import fs from 'fs/promises'

export const getFilePath = (dir, fileName, extension) => (path.join(dir, `${fileName}${extension}`))

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

export const readFilePath = async (filePath) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}