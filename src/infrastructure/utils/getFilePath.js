import path from 'path'

const getFilePath = (dir, fileName, extension) => (path.join(dir, `${fileName}${extension}`))

export { getFilePath }