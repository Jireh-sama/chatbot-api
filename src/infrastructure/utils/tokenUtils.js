import jwt from 'jsonwebtoken'

export const generateAccessToken = (email, secretToken, tokenDuration) => {
  return jwt.sign(email, secretToken, { expiresIn: tokenDuration });
};