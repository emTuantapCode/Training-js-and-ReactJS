const mongoose = require('mongoose')
const { Schema } = mongoose

const Boards = new Schema({
    arraycards: [{ type: String, ref: 'cards' }]
})

module.exports = mongoose.model('boards', Boards);