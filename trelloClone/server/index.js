var express = require('express')
var app = express()
const port = 8080;
const route = require('./Router/index')
const db = require('./config')
db.connect()

route(app)

app.listen(port, () => console.log(`success at ${port}`))