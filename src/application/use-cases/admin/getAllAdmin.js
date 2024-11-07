function getAllAdmin(adminRepository) {
  const execute = async () => {
    const adminList = await adminRepository.findAllAdmin()
    if (!adminList || adminList.length === 0) throw new CustomError('No admin found', 404)

    return adminList
  }
  return { execute }
}

export default getAllAdmin