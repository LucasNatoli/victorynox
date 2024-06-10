const { decodeToken } = require('./middleware')
const { parseFile } = require("./fs-tools")
const config = require("../config")

function getPairs(req, res) {
  const response = [
    { symbol: "BTCUSDT", asset: "BTC", asset2: "USDT" },
    { symbol: "SOLUSDT", asset: "SOL", asset2: "USDT" },
    { symbol: "ETHUSDT", asset: "ETH", asset2: "USDT" },
  ]
  res.status(200).send(response)
}

function getTicker(req, res) {

  const symbols = JSON.parse(req.query.symbols)
  const tickers = parseFile(`${config.TICKERS_FOLDER}/${config.TICKERS_FILE}.json`)
  var results = []

  for (var i = 0, j = symbols.length; i < j; i++) {
    for (var k = 0, l = tickers.length; k < l; k++) {
      if (symbols[i] === tickers[k].symbol) {
        results.push(tickers[k])
        k = l
      }
    }
  }

  res.status(200).send(results)
}

module.exports = app => {

  const baseUrl = '/service'
  const pairsUrl = `${baseUrl}/pairs`
  const tickerUrl = `${baseUrl}/ticker`

  app.get(pairsUrl, decodeToken, getPairs)
  app.get(tickerUrl, decodeToken, getTicker)
}