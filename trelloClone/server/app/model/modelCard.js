const mongoose = require('mongoose')
const { Schema } = mongoose

const Cards = new Schema({
    title: String,
    boardID: String,
    arraytasks: [{ type: String, ref: 'tasks' }],
})

module.exports = mongoose.model('cards', Cards);