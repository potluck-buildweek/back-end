const { TOKEN_SECRET } = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  console.log(req.headers)

  if (!token) {
    return next({ status: 401, message: 'Token Required'})
  }
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next({
        status: 401,
        message: `bad token: ${err.message}`
      })
    }
    req.decodedJwt = decoded
    console.log(decoded)
    next()
  })
};