import { ObjectId } from "mongodb"

function deleteAdmin(adminRepository) {
  const execute = async (id) => {
    const adminObjectId = new ObjectId(id)
    const deleteCount = await adminRepository.deleteAdmin(adminObjectId)
    if (deleteCount === 0) {
      throw new CustomError('No admin found with the given id', 404)
    }
  }

  return { execute }
}

export default deleteAdmin