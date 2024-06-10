const jwt = require('jsonwebtoken');
const jwtSecret = process.env.WOO_JWT_SECRET;
const config = require("../config")

const MSG_INVALID_TOKEN = 'Invalid authorization header.'
const MSG_INVALID_CREDENTIALS = 'The credentials you provided are not valid. Please try again.'


function validateRequestEmail(req, res, next) {

  const email = req.body.email;
  const emailType = typeof (email)
  if (emailType === 'string' && email.length < 320) {
    next()
  } else {
    res.status(403).send(MSG_INVALID_CREDENTIALS)
  }
}

function validateRequestPassword(req, res, next) {

  const password = req.body.password;
  const passwordType = typeof (password)
  if (passwordType === 'string' && password.length === 128) {
    next()
  } else {
    res.status(403).send(MSG_INVALID_CREDENTIALS)
  }
}

/**
 * Checks for a valid acuth header. If valid the function will decode de user 
 * key and user data folder and set their values en the request object
 * 
 * @param {request} req - express request object
 * @param {response} res - express response object 
 * @param {next} next - express next object 
 */
function decodeToken(req, res, next) {

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); // Remove Bearer from string
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") res.status(403).send();
        else res.status(500).send();
      } else {
        decoded.userFolder = `${config.DATA_FOLDER}/${decoded.id}`
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send(MSG_INVALID_TOKEN);
  }
}

module.exports = { decodeToken, validateRequestEmail, validateRequestPassword }