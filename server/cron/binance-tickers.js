const tickers = require("./tickers.json")
const axios = require("axios")
const { writeJson } = require("../router/fs-tools")
const  config  = require("../config")

async function getTickers() {
  try {
    const quoted = tickers.join('","')
    const url = `https://api.binance.com/api/v3/ticker/price?symbols=["${quoted}"]`;
    const response = await axios.get(url);
    writeJson(`../${config.TICKERS_FOLDER}/${config.TICKERS_FILE}.json`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error de comunicacion con binance: ${error}`);
    throw error;
  }
}
async function getTickers24() {
  try {
    const quoted = tickers.join('","')
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=["${quoted}"]`;
    const response = await axios.get(url);
    writeJson(`../${config.TICKERS_FOLDER}/${config.TICKERS24_FILE}.json`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error de comunicacion con binance: ${error}`);
    throw error;
  }
}
getTickers()
  .then((res) => {
    console.log('Tickers actualizados');
  })
  .catch((error) => {
    console.error('Error al obtener los tickers:', error.message);
  });