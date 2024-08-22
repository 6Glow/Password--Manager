const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()
console.log(process.env.MONGO_URI)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})
