const { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } = require('fs')
const config = require('../config')


function checkMkdir(path) {
  if (!existsSync(path)) mkdirSync(path)
}

function parseFile(path) {
  if (existsSync(path)) {
    const fileContent = readFileSync(path)
    return JSON.parse(fileContent)
  } else {
    return []
  }
}

function writeJson(file, json, flag = config.WRITE_FLAG) {
  writeFileSync(file, JSON.stringify(json), flag)
}

function listFolders(path) {
  try {

    const entries = readdirSync(path, { withFileTypes: true })
    return entries.filter(e => e.isDirectory())
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = {
  checkMkdir,
  listFolders,
  parseFile,
  writeJson,
}