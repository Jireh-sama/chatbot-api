/**
 * Creates a knowledge entry object.
 *
 * @param {string} intent - The intent of the knowledge entry.
 * @param {string[]} documents - The documents associated with the knowledge entry.
 * @param {string} answer - The answer to the knowledge entry.
 * @returns {Object} - The knowledge entry object with `validate` and `toObject` methods.
 */
function createKnowledgeEntry(intent, documents, answer, fileUrl) {

    const validate =() => {
      // Validate intent
      if (!intent) {
        throw new Error('Intent is required')
      }
      if (typeof intent !== 'string') {
        throw new Error(`Intent must be a string, received ${typeof intent}`)
      }
      // Validate documents
      if (!documents) {
        throw new Error('Documents is required')
      }
      if (!Array.isArray(documents)) {
        throw new Error(`Documents is not an array, received ${typeof documents}`)
      }
      if (documents.length === 0) {
        throw new Error('Array length is zero')
      }
      for (const document of documents) {
        if (typeof document !== 'string') {
          throw new Error(`Documents array must only contain strings, received ${typeof document}`)
        }
      }
      // Validate answer
      if (!answer) {
        throw new Error('Answer is required')
      }
      if (typeof answer !== 'string') {
        throw new Error(`Answer must be a string, received ${typeof answer}`)
      }
    }
    
    const toObject = () => {
      if (!fileUrl) return { intent, documents, answer }
      
      return {intent, documents, answer, fileUrl}
    }

  return { validate, toObject }
}

export default createKnowledgeEntry