const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./config')
const route = require('./Router/index')
const port = 8080
db.connect()
const app = express()

app.use(cors());
app.use(morgan('combined'))
app.use(express.json())
route(app)

app.listen(port, () => {
    console.log(`Success at ${port}`)
})