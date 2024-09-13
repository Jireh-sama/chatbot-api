function validateRequestMiddleware(req, res, next) {

  // if (req.path === '/admin') {
  //   return next()
  // }
  // const apiKey = req.headers['authorization']
  // if (apiKey !== process.env.API_KEY) {
  //   console.error('Unauthorized request has been detected');
  //   return res.status(401).json({ success: false, response: 'Unauthorized Request' })
  // }
  return next()
}

export default validateRequestMiddleware