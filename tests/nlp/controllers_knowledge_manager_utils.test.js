const { checkKnowledgeBaseExists } = require('@controllers/knowledge_manager/utils')
const fs = require('fs').promises

describe('Knowledge Manager Utils(checkKnowledgeBaseExists)', () => {
  it('should return false if the file does not exist',async () => {
    const spy = jest.spyOn(fs, 'access').mockResolvedValueOnce()
    const result = await checkKnowledgeBaseExists()

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(true)
  });

  it('should return true if the file does exist',async () => {
    const spy = jest.spyOn(fs, 'access').mockRejectedValueOnce()
    const result = await checkKnowledgeBaseExists()

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(false)
  });
});
