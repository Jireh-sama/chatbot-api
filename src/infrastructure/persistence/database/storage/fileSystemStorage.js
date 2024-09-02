import fs from 'fs/promises'

function fileSystemStorage() {
    const readFile = async (filePath) => {
      try {
        const data = await fs.readFile(filePath, "utf8");
        console.log(`Read file at: ${filePath}`);
        return JSON.parse(data)
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error('File path does not exist');
          return null
        } 
        throw error
      }
    }

    const readDirectory = async (directory) => {
      try {
        const fileNames = await fs.readdir(directory)
        return fileNames;
      } catch (error) {
        console.error(`Directory does not exist`);
      }
    }

    const writeFile = async (filePath, dataList) => {
      try {
        const fileData = []
        for (const data of dataList) {
          fileData.push(data.toObject())
        }
        // use .json extension
        await fs.writeFile(filePath, JSON.stringify(fileData, null, 2))
      } catch (error) {
        console.log(error);        
      }
    }

    const updateFile = async (filePath, data) => {
      try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
      } catch (error) {
        console.log(error);  
      }
    }

    const deleteFile = async (filePath) => {
      await fs.unlink(filePath)
    }
  return { readFile, readDirectory, updateFile, writeFile, deleteFile }
}

export default fileSystemStorage