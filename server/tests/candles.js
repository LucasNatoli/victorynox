
const { readdirSync } = require('fs')
const { extname } = require('path')

const config = require("../config")

const period = 'monthly'
const symbol = 'BTCUSDT'
const granularity = '1h'
const sg = `${symbol}/${granularity}`
const path = `${config.HISTORY_FOLDER}/${period}/${sg}`

function listMonthly() {
  const ret = []
  try {
    const files = readdirSync(path)
    const zips = files.filter(f => extname(f) === '.zip')
    zips.map(item => {
      const matches = item.match(/-(\d{4})-(\d{2})\.zip$/);
      if (matches) {
        const y = matches[1];
        const m = matches[2];
        ret.push(`${y}-${m}`);
      }
    });
  } catch (error) {
    console.error(error)
  }
  return ret

}


console.log(listMonthly())