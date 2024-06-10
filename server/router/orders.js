const { readFileSync } = require('fs')
const { Spot } = require('@binance/connector')
const config = require('../config')

const { decodeToken } = require('./middleware')
const { checkMkdir, parseFile, writeJson } = require('./fs-tools')

/**
 * Fetch an asset from the users spot wallet.
 * 
 * @param {request} req - express request object 
 * @param {response} res - express response object
 */
async function fetchAsset(req, res) {

  const { symbol, api } = req.params
  const userFolder = req.decoded.userFolder
  const apiFile = `${userFolder}/${config.API_FILE}.json`
  const assetsFolder = `${userFolder}/${config.ASSETS_FOLDER}`

  try {
    const apis = parseFile(apiFile)
    const found = findApi(apis, api)
    const { k, s } = found
    const client = new Spot(k, s)
    const response = await client.allOrders(symbol)
    checkMkdir(assetsFolder)
    writeJson(`${assetsFolder}/${symbol}.json`, response.data)
    res.status(200).send(response.data)
  } catch (error) {
    //TODO: 401 error -> sucede cuando la IP no esta actualizada en binance
    const { code, status, message } = error
    if (status = 410) res.status(status).send({ code, status, message })
    else res.status(500).send()
  }
}

/**
 * Return users Api information for the api argument.
 * @param {string[]} apis - An array containing all apis 
 * @param {string} api -  the API key we are searching
 * @returns {{}} The Api matching the api argument.
 */
function findApi(apis, api) {
  for (var i = 0, j = apis.length; i < j; i++) {
    if (apis[i].t = api) return apis[i]
  }
  return undefined
}

/**
 * Reads and sends an asset file from users assets folder.
 * 
 * @param {request} req - express request object 
 * @param {response} res - express response object
 */
function readAsset(req, res) {
  const { symbol } = req.params
  try {
    const data = readFileSync(`${req.decoded.userFolder}/${config.ASSETS_FOLDER}/${symbol}.json`)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send()
  }
}

module.exports = app => {
  app.get("/orders/fetch/:symbol/:api", decodeToken, fetchAsset)
  app.get("/orders/:symbol", decodeToken, readAsset)
}