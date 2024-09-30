function verifyAPIKey(req, res, next) {
  const apiKey = req.headers['authorization']
  if (apiKey !== process.env.API_KEY) {
    console.error('Unauthorized request has been detected');
    return res.status(401).json({ success: false, response: 'Unauthorized Request' })
  }
  return next()
}

export default verifyAPIKey