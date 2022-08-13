const Board = require('./Board')
const Card = require('./Card')
const Task = require('./Task')

function route(app) {
    app.use('/', Board)
    app.use('/card', Card)
    app.use('/task', Task)
}
module.exports = route
