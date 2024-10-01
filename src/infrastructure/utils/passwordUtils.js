import bcrypt from 'bcrypt' 

export const hashPassword = async (password) => {
  const saltRounds = 10; // The cost factor for bcrypt
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const verifyPassword = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};


