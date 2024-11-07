import { ObjectId } from "mongodb";

function updateAdminRole(adminRepository) {
  const execute = async (adminInfo) => {
    const {_id, role} = adminInfo
    const id = ObjectId.createFromHexString(_id)
    const foundAdmin = await adminRepository.findOneAdmin({_id: id})

    if (!foundAdmin) throw new CustomError('No admin found with the given credentials', 404)
    
    await adminRepository.updateAdminRole(id, role)
  };
  return { execute }
}

export default updateAdminRole