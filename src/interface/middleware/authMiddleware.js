import jwt from 'jsonwebtoken'

export const verifyToken =  (req, res, next) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error('env TOKEN_SECRET is not set');
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Assuming 'Bearer <token>'

  // Check if the token value exists in the header
  if (!token) {
    const message = process.env.NODE_ENV === 'development'
      ? 'Token missing from Authorization header'
      : 'Unauthorized';
    return res.status(401).json({ message });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Add the user data from the token to the request object
    req.user = user;
    
    // Move to the next middleware or route handler
    next();
  });
};

export const verifyAPIKey = (req, res, next) => {
  const apiKey = req.headers['authorization']
  if (apiKey !== process.env.API_KEY) {
    if (process.env.NODE_ENV === 'development') console.error('Unauthorized request has been detected')
    return res.status(401).json({ success: false, response: 'Unauthorized Request' })
  }

  return next()
}