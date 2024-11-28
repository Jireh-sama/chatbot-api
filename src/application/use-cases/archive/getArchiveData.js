function getArchiveData(archiveRepository) {
  const execute = async (archiveType) => {

    const archiveDocument = await archiveRepository.getArchiveDocument(archiveType)
    return archiveDocument
  }

  return { execute }

}

export default getArchiveData
  