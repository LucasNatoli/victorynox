const { readdirSync, existsSync } = require("fs");
const { extname, parse } = require("path");
const { decodeToken } = require("./middleware");
const config = require("../config");
const { parseFile, writeJson } = require("./fs-tools");

/**
 *  APIS 
 */
function addApi(req, res) {
  const t = Date.now();
  const path = `${req.decoded.userFolder}/${config.API_FILE}.json`;
  const { n, k, s } = req.body;
  try {
    var content = parseFile(path);
    content.push({ t, n, k, s });
    writeJson(path, content);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
}

function getApis(req, res) {
  const path = `${req.decoded.userFolder}/${config.API_FILE}.json`;
  try {
    const content = parseFile(path);
    //filter keys data
    var filtered = [];
    const l = content.length;
    for (var i = 0; i < l; i++) {
      const { t, n } = content[i];
      filtered.push({ t, n });
    }
    res.status(200).send(filtered);
  } catch (error) {
    res.status(500).send();
  }
}

function updateApi(req, res) {
  const { t, n, k, s } = req.body;
  var archivoNuevo = []
  //armar el path del archivo api del usuario
  const path = `${req.decoded.userFolder}/${config.API_FILE}.json`;
  try {
    //parseFile del archivo del usuario
    const content = parseFile(path);

    //recorriendo el archivo que ahora es un array...
    for (let x = 0; x < content.length; x++) {
      //buscar dentro del array la t que corresponda
      const element = content[x];
      if (element.t === t) {
        //actualizar los valores n, k, s
        element.n = n;
        element.k = k;
        element.s = s;
      } 
      //agrego al archivo de salido nuevo
      archivoNuevo.push(element)
      
    }
    //guardar el archivo con los nuevos dtos
    writeJson(path, archivoNuevo)
    //devolver ok 200
    res.status(200).send()
  } catch (error) {
    //por el contrario devolver 500
    res.status(500).send();
  }
}

function deleteApi(req, res) {
  const { t } = req.body;
  var archivoNuevo = []
  //armar el path del archivo api del usuario
  const path = `${req.decoded.userFolder}/${config.API_FILE}.json`;
  try {
    //parseFile del archivo del usuario
    const content = parseFile(path);

    //recorriendo el archivo que ahora es un array...
    for (let x = 0; x < content.length; x++) {
      //buscar dentro del array la t que corresponda
      const element = content[x];
      if (element.t !== t) {        
        //agrego al archivo de salido nuevo
        archivoNuevo.push(element)
      } 
    }
    //guardar el archivo con los nuevos dtos
    writeJson(path, archivoNuevo)
    //devolver ok 204
    res.status(204).send()
  } catch (error) {
    //por el contrario devolver 500
    res.status(500).send();
  }
}


/**
 *  ASSETS 
 */
function getAssets(req, res) {
  const path = `${req.decoded.userFolder}/${config.ASSETS_FOLDER}`;
  if (!existsSync(path)) return [];
  try {
    const files = readdirSync(path);
    const jsonFiles = files.filter((file) => extname(file) === ".json");
    const content = jsonFiles.map((file) => parse(file).name);
    res.status(200).send(content);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

function addFav(req, res) {
  const t = Date.now();
  const { symbol } = req.body;
  const path = `${req.decoded.userFolder}/${config.FAVS_FILE}.json`;
  try {
    var content = parseFile(path);
    //idempotente - si ya existia no hago nada
    const filter = content.filter((i) => i.symbol == symbol);
    if (filter.length == 0) content.push({ t, symbol });
    writeJson(path, content);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

function getFavs(req, res) {
  const path = `${req.decoded.userFolder}/${config.FAVS_FILE}.json`;
  try {
    var content = parseFile(path);
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send();
  }
}

function updateFav (req, res){
  //hacer lo mismo que updateApi pero con el archivo favs.json
  const { t, symbol } = req.body;
  var archivoNuevo = []
  //armar el path del archivo api del usuario
  const path = `${req.decoded.userFolder}/${config.FAVS_FILE}.json`;
  try {
    //parseFile del archivo del usuario
    const content = parseFile(path);

    //recorriendo el archivo que ahora es un array...
    for (let x = 0; x < content.length; x++) {
      //buscar dentro del array la t que corresponda
      const element = content[x];
      if (element.t === t) {
        //actualizar los valores n, k, s
        element.symbol = symbol;
      } 
      //agrego al archivo de salido nuevo
      archivoNuevo.push(element)
      
    }
    //guardar el archivo con los nuevos dtos
    writeJson(path, archivoNuevo)
    //devolver ok 200
    res.status(200).send()
  } catch (error) {
    //por el contrario devolver 500
    res.status(500).send();
  }
}

function deleteFav (req, res){
  const { t } = req.body;
  var archivoNuevo = []
  //armar el path del archivo api del usuario
  const path = `${req.decoded.userFolder}/${config.FAVS_FILE}.json`;
  try {
    //parseFile del archivo del usuario
    const content = parseFile(path);

    //recorriendo el archivo que ahora es un array...
    for (let x = 0; x < content.length; x++) {
      //buscar dentro del array la t que corresponda
      const element = content[x];
      if (element.t !== t) {        
        //agrego al archivo de salido nuevo
        archivoNuevo.push(element)
      } 
    }
    //guardar el archivo con los nuevos dtos
    writeJson(path, archivoNuevo)
    //devolver ok 204
    res.status(204).send()
  } catch (error) {
    //por el contrario devolver 500
    res.status(500).send();
  }
}

function addTicker (req, res){
  const t = Date.now();
  const { symbol } = req.body;
  const path = `${req.decoded.userFolder}/${config.TICKERS_FILE}.json`;
  try {
    var content = parseFile(path);
    //idempotente - si ya existia no hago nada
    const filter = content.filter((i) => i.symbol == symbol);
    if (filter.length == 0) content.push({ t, symbol });
    writeJson(path, content);
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

function getTickers (req,res){
  const path = `${req.decoded.userFolder}/${config.TICKERS_FILE}.json`;
  try {
    var content = parseFile(path);
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send();
  }
}

function updateTicker (req,res){
//hacer lo mismo que updateApi pero con el archivo tickers.json
const { t, symbol } = req.body;
var archivoNuevo = []
//armar el path del archivo api del usuario
const path = `${req.decoded.userFolder}/${config.TICKERS_FILE}.json`;
try {
  //parseFile del archivo del usuario
  const content = parseFile(path);

  //recorriendo el archivo que ahora es un array...
  for (let x = 0; x < content.length; x++) {
    //buscar dentro del array la t que corresponda
    const element = content[x];
    if (element.t === t) {
      //actualizar los valores n, k, s
      element.symbol = symbol;
    } 
    //agrego al archivo de salido nuevo
    archivoNuevo.push(element)
    
  }
  //guardar el archivo con los nuevos dtos
  writeJson(path, archivoNuevo)
  //devolver ok 200
  res.status(200).send()
} catch (error) {
  //por el contrario devolver 500
  res.status(500).send();
}
}

function deleteTicker (req, res){
  const { t } = req.body;
  var archivoNuevo = []
  //armar el path del archivo api del usuario
  const path = `${req.decoded.userFolder}/${config.TICKERS_FILE}.json`;
  try {
    //parseFile del archivo del usuario
    const content = parseFile(path);

    //recorriendo el archivo que ahora es un array...
    for (let x = 0; x < content.length; x++) {
      //buscar dentro del array la t que corresponda
      const element = content[x];
      if (element.t !== t) {        
        //agrego al archivo de salido nuevo
        archivoNuevo.push(element)
      } 
    }
    //guardar el archivo con los nuevos dtos
    writeJson(path, archivoNuevo)
    //devolver ok 204
    res.status(204).send()
  } catch (error) {
    //por el contrario devolver 500
    res.status(500).send();
  }
}

module.exports = (app) => {
  const baseUrl = "/user";
  const apiUrl = baseUrl + "/apis";
  const favsUrl = baseUrl + "/favorites";
  const assetsUrl = baseUrl + "/assets";

  app.post(apiUrl, decodeToken, addApi);
  app.get(apiUrl, decodeToken, getApis);
  app.put(apiUrl, decodeToken, updateApi);
  app.delete(apiUrl, decodeToken, deleteApi);
  app.post(favsUrl, decodeToken, addFav);
  app.put(favsUrl, decodeToken, updateFav);
  app.get(favsUrl, decodeToken, getFavs);
  app.delete(favsUrl, decodeToken, deleteFav);
  app.get(assetsUrl, decodeToken, getAssets);
  app.post(tickersUrl, decodeToken, addTicker);
  app.get(tickersUrl, decodeToken, getTickers);
  app.put(tickersUrl, decodeToken, updateTicker);
  app.delete(tickersUrl, decodeToken, deleteTicker);
};
