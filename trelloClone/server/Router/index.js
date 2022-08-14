const Board = require('./Board')
const Card = require('./Card')
const Task = require('./Task')

function route(app) {
    app.use('/task', Task)
    app.use('/card', Card)
    app.use('/', Board)
}
module.exports = route
