const { Spot } = require('@binance/connector')
const client = new Spot(
  "uRQ7gbmwoSoCFIMjKiLIKRBlrQG3YtWtTvft8EhMT1IjrIu1pWXBPEWJlX79c9CE",
  "xCxg6g64KoSfiB9h9KHF4pNEKb9kx6FexY5EMpBfHnnvkj29nQItDt4au6IfK163"

)
client.allOrders("AXSUSDT").then(
  response => {
    //store results
    console.log(response)
  },
  err => console.error(err)
)