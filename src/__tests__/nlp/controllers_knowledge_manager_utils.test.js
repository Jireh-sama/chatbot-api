const { checkKnowledgeBaseExists, extractKnowledgeBaseNameFromPath, getKnowledgeBasePath, overwriteKnowledgeBaseFile, getKnowldgePathList} = require('@controllers/knowledge_manager/utils')
const fs = require('fs').promises

describe('Knowledge Manager Utils', () => {
  // Reset mocks for each test
  afterEach(() => jest.restoreAllMocks);

  it('should return false if the file does not exist(checkKnowledgeBaseExists)',async () => {
    const spy = jest.spyOn(fs, 'access').mockResolvedValueOnce()
    const result = await checkKnowledgeBaseExists('src/knowledge/fake_data')
    expect(spy).toHaveBeenCalled();
    expect(result).toBe(true)
  });

  it('should return true if the file does exist(checkKnowledgeBaseExists)',async () => {
    const spy = jest.spyOn(fs, 'access').mockRejectedValueOnce()
    const result = await checkKnowledgeBaseExists('src/knowledge/fake_data')
    expect(spy).toHaveBeenCalled();
    expect(result).toBe(false)
  });

  it('should throw an error if dir is empty(checkKnowledgeBaseExists)', async () => {
    await expect(() => checkKnowledgeBaseExists('')).rejects.toThrow(
      new Error('Dir is required and cannot be empty')
    );
  });
  

  it('should extract and return a file name(string) from a path(extractKnowledgeBaseNameFromPath)', () => {
    const path = "src/knowledge/sample_data.json"
    const fileName = extractKnowledgeBaseNameFromPath(path)
    expect(fileName).toBe('sample')
    expect(typeof fileName).toBe('string')
  });

  it('should throw an error if path is empty(extractKnowledgeBaseNameFromPath)', () => {
    expect(() => extractKnowledgeBaseNameFromPath()).toThrow(new Error('Path is required and cannot be empty'))
  });

  it('should return a complete path dir when passed a file name ', () => {
    expect(getKnowledgeBasePath('sample')).toBe('src/knowledge/sample_data.json')
  });
  
  it('should call the function with the passed arguments(overwriteKnowledgeBaseFile)',async () => {
    const path = "src/knowledge/sample_data.json"
    const data = { data: 'sample data' };
    const expectedReulst = {
      path: path,
      data: JSON.stringify(data, null, 2)
    }

    const spy = jest.spyOn(fs, 'writeFile').mockResolvedValue(expectedReulst)

    const result = await overwriteKnowledgeBaseFile(path, data);

    expect(spy).toHaveBeenCalledWith(path, JSON.stringify(data, null, 2))
  });
  
});



describe