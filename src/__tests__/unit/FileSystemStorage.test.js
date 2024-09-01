import FileSystemStorage from "#database/storage/FileSystemStorage.js";
import fs from 'fs/promises'
const fss = new FileSystemStorage();

const fakePath = 'src/to-some-path'

describe('FileSystemStorage Module', () => {

  // Reset mocks after each test
  afterEach(() => jest.restoreAllMocks());

  it('should read a file and return that data',async () => {
    const expectedData = { key: 'value' }
    const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(expectedData)
    const result = await fss.read(fakePath)
    expect(spy).toHaveBeenCalledWith(fakePath, 'utf-8');
    expect(result).toEqual(expectedData)
  });

  it('should throw an error when readFile fails',async () => {
    const spy = jest.spyOn(fs, 'readFile').mockRejectedValue()
    await expect(() => fss.read()).rejects.toThrow()
  });

  
  
  

})
