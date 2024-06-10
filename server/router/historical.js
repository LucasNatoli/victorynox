const { createWriteStream, existsSync } = require('fs')
const https = require('https')
const config = require('../config')
const { listFolders, checkMkdir } = require('./fs-tools')
const { decodeToken } = require('./middleware')

const FILE_NOT_FOUND = 'file not found'

/**
 * Returns a list of zip file names for a daily period
 * @param {request} req - express request object
 * @returns {string[]}
 */
function dailyFromTo(req) {

  const { year, month, day, year2, month2, day2, symbol, granularity } = req.params
  var from = new Date(year, month - 1, day)
  const to = new Date(year2, month2 - 1, day2)
  var filenames = []

  while (from <= to) {
    const y = from.getFullYear()
    const m = from.getMonth() + 1
    const d = from.getDate()

    filenames.push(zipFilename(symbol, granularity, y, m, d))
    from.setDate(from.getDate() + 1)
  }
  return filenames
}

/**
 * 
 * Downloads a file from Binance Data Collection.
 * @param {string} url - url of the file 
 * @param {string} path - folder where file is saved
 * @returns {Promise}
 */
function downloadFile(url, path) {

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      console.log('statuscode', res.statusCode)
      res.on('error', reject)
      if (res.statusCode !== 200) {
        reject(FILE_NOT_FOUND)
      } else {
        const fileStream = createWriteStream(path);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          resolve()
        });
      }
    })
  })

}

/**
 * 
 * Fetch only one file from Data Collection
 * 
 * @param {request} req - express request object 
 * @param {response} res - express response object
 */
async function fetchOneFile(req, res) {

  const { dataFolder, prefix } = useParams(req)
  const { symbol, granularity, year, month, day } = req.params
  const filename = zipFilename(symbol, granularity, year, month, day)
  var status = 201
  if (!existsSync(`${dataFolder}/${filename}`)) {
    const url = `https://data.binance.vision/${prefix}/${filename}`
    try {
      checkMkdir(dataFolder)
      await downloadFile(url, `${dataFolder}/${filename}`)

    } catch (error) {
      console.log(error)
      if (error === FILE_NOT_FOUND) status = 404
      else status = 500
    }
  }
  res.status(status).send()
}

/**
 * Fetch files from Data Collection in a time range.
 * This function checks for already existing files and skips them.
 * 
 * @param {request} req - express request object 
 * @param {response} res - express response object
 */
async function fetchFiles(req, res) {
  try {
    const { dataFolder, interval, prefix } = useParams(req)
    const filenames = interval === 'monthly' ? monthlyFromTo(req) : dailyFromTo(req)
    checkMkdir(dataFolder)
    for (var i = 0, j = filenames.length; i < j; i++) {
      const filename = filenames[i]
      if (!existsSync(`${dataFolder}/${filename}`)) {
        const url = `https://data.binance.vision/${prefix}/${filename}`
        await downloadFile(url, `${dataFolder}/${filename}`)
      }
    }
    res.status(201).send()
  } catch (error) {
    console.log(error)
    if (error === FILE_NOT_FOUND) res.status(404).send()
    else res.status(500).send()

  }

}

/**
 * Sends a json object containing monthly and daily imported data sets.
 * @param {request} req - express request object 
 * @param {response} res - express response object 
 */
function listHistory(req, res) {
  const content = {
    monthly: [],
    daily: []
  }
  const path = `${config.HISTORY_FOLDER}/`
  const monthlyPath = `${path}/monthly`
  const dailyPath = `${path}/daily`
  try {
    const mf = listSymbols(monthlyPath)
    const df = listSymbols(dailyPath)
    content.monthly = mf
    content.daily = df
    res.status(200).send(content)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

/**
 * Lists symbols names based on the folders names
 * 
 * @param {string} path  - folder containing symbols subfolders
 * @returns {string[]}]
 */
function listSymbols(path) {
  const sf = listFolders(path)
  const symbols = []
  for (var i = 0, j = sf.length; i < j; i++) {
    const name = sf[i].name
    const gf = listFolders(`${path}/${name}`)
    const grans = []
    for (var x = 0, y = gf.length; x < y; x++) {
      grans.push(gf[x].name)
    }
    symbols.push({ symbol: name, grans })
  }
  return symbols
}

/**
 * Returns a list of zip file names for a monthly period
 * @param {request} req - express request object
 * @returns {string[]}
 */
function monthlyFromTo(req) {

  const { year, month, year2, month2, symbol, granularity } = req.params
  var filenames = []
  var from = new Date(year, month - 1)
  var to = new Date(year2, month2 - 1)
  if (from > to) return filenames
  while (from <= to) {
    const y = from.getFullYear()
    const m = from.getMonth() + 1
    filenames.push(zipFilename(symbol, granularity, y, m))
    from.setMonth(from.getMonth() + 1)
  }
  return filenames
}

/**
 * Parses url params
 * @param {string} req 
 * @returns {{}} 
 */
function useParams(req) {
  const { granularity, symbol, day } = req.params
  const interval = !day ? 'monthly' : 'daily'
  const sg = `${symbol}/${granularity}`
  const dataFolder = `${config.HISTORY_FOLDER}/${interval}/${sg}`
  const prefix = `data/spot/${interval}/klines/${sg}`

  return { dataFolder, granularity, interval, prefix, symbol }

}

/**
 * Generate a zip filename based on the arguments.
 * 
 * @param {string} symbol 
 * @param {string} granularity 
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {string}
 */
function zipFilename(symbol, granularity, year, month, day) {
  const m = `0${month}`.slice(-2)
  const d = `0${day}`.slice(-2)
  return `${symbol}-${granularity}-${year}-${m}${(day) ? `-${d}` : ''}.zip`
}


module.exports = app => {

  const baseUrl = '/history'
  //TODO: Remove interval from path
  const fetchUrl = `${baseUrl}/fetch/:interval/:symbol/:granularity/:year/:month/:day?`
  const fetchPeriodUrl = `${fetchUrl}/:year2/:month2/:day2?`

  app.get(fetchUrl, decodeToken, fetchOneFile)
  app.get(fetchPeriodUrl, decodeToken, fetchFiles)
  app.get(baseUrl, decodeToken, listHistory)
}