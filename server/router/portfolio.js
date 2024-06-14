const fs = require("fs");
const { decodeToken } = require("./middleware");
const { Spot } = require("@binance/connector");

const config = require("../config");
const { parseFile, writeJson } = require("./fs-tools");

function getPortfolio(req, res) {
  const keysPath = `${req.decoded.userFolder}/${config.API_FILE}.json`;
  const keys = parseFile(keysPath);
  if (keys.length === 0) {
    res
      .status(404)
      .send({
        status: "error",
        code: 404,
        message: "No se encontraron los archivos de claves API",
      });
    return;
  }
  const primeraClave = keys[0];
  const client = new Spot(primeraClave.k, primeraClave.s);
  const path = `${req.decoded.userFolder}/${config.PORTFOLIO_FILE}.json`;
  try {
    const stats = fs.statSync(path);
    if ((new Date() - stats.mtime) / 1000 / 60 > 5) {
      client
        .account()
        .then((response) => {
          writeJson(path, response.data.balances);
          res.status(200).send(response.data.balances);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send();
        });
    } else {
      const portfolio = parseFile(path);
      res.status(200).send(portfolio);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

module.exports = (app) => {
  app.get("/portfolio", decodeToken, getPortfolio);
};
