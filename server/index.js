const express = require('express')
const cors = require('cors')
const router = require('./router')

const PORT = process.env.WOO_PORT;
const app = express()

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

const server = app.listen(PORT, console.log(`🚀 Listening on Port ${PORT}`))

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`🚧 Port ${PORT} busy`);
  } else {
    console.error(`💀 ${err}`);
  }
});

