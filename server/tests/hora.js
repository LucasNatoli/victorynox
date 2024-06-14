const fs = require('fs')

const stats = fs.statSync('/Volumes/Datos/github/victorynox/server/data/81ad8832896174f42d84e9fa39e487d07fea40b490c6f2fb485332b825454281/portfolio.json')

const ultimaActualizacion = stats.mtime
const ahora = new Date()
const difEnMiliseg = ahora - ultimaActualizacion
const difEnMinutos = difEnMiliseg / 1000 / 60


console.log(ultimaActualizacion, ahora, difEnMinutos)