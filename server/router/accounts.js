const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs')
const { SHA3 } = require('sha3')
const credential = require('credential')
const jwt = require('jsonwebtoken');
const { decodeToken } = require('./middleware');
const config = require('../config')
const jwtSecret = process.env.WOO_JWT_SECRET;
/**
 * Returns a pseudo random number between min and max
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Send server time, token iat and expiration time to client
 * @param {request} req - express request object 
 * @param {response} res - express response object
 */
function checkToken(req, res) {
  res.status(200).send([{
    serverTime: Math.floor(Date.now() / 1000),
    iat: req.decoded.iat,
    exp: req.decoded.exp
  }])
}

/**
 * Register an new account. This functions sends:
 * 
 * + 201 if the account hasd been created succesfully
 * + 401 if the account already exists
 * + 500 on any error
 * @param {request} req - express request object 
 * @param {response} res - express response object
 */
function register(req, res) {
  const { password, userId } = req.body
  const hash = new SHA3(256)
  hash.update(userId)
  const folderHash = hash.digest('hex')

  if (existsSync(`${config.DATA_FOLDER}/${folderHash}`)) {
    res.status(401).send() //TODO: Investigar que codigo de error se devuelve por account publicada
  } else {
    const pw = credential()
    pw.hash(password, (err, hash) => {
      if (err) {
        res.status(500).send()
      } else {
        try {
          const path = `${config.DATA_FOLDER}/${folderHash}`
          mkdirSync(path, { recursive: true })
          writeFileSync(`${path}/${config.CREDENTIAL_FILE}.json`, hash, config.WRITE_FLAG)
          res.status(201).send()
        } catch (error) {
          res.status(500).send()
        }
      }
    })
  }
}

/**
 * Sends a session jwt if the login information matches an existing account
 * 
 * @param {request} req - express request object 
 * @param {response} res - express response object
 * @returns 
 */
function login(req, res) {

  const { userId, password } = req.body
  const hash = new SHA3(256)
  hash.update(userId)
  const folderHash = hash.digest('hex')
  if (!existsSync(`${config.DATA_FOLDER}/${folderHash}`)) {
    setTimeout(_ => res.status(403).send(), getRandomInt(3000, 12000))
  } else {
    const cred = readFileSync(`${config.DATA_FOLDER}/${folderHash}/${config.CREDENTIAL_FILE}.json`, 'utf8');
    //todo: validate cred contents. else send error
    const pw = credential()
    pw.verify(cred, password, (err, isValid) => {
      if (err) {
        res.status(500).send(err)
      } else {
        if (isValid) {
          let token = jwt.sign(
            { id: folderHash },
            jwtSecret,
            { expiresIn: '24h' }
          );
          res.status(200).send({ token })
        } else {
          setTimeout(_ => res.status(403).send(), getRandomInt(3000, 12000))
        }
      }
    })
  }
}

module.exports = app => {

  const baseUrl = '/accounts'
  const checkTokenUrl = baseUrl + '/check-token'
  const registerUrl = baseUrl + '/register'
  const loginUrl = baseUrl + '/login'

  app.get(checkTokenUrl, decodeToken, checkToken)
  app.post(registerUrl, register)
  app.post(loginUrl, login)

}