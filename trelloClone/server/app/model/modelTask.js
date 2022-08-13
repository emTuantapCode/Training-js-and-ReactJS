const mongoose = require('mongoose')
const { Schema } = mongoose

const Tasks = new Schema({
    title: String,
    cardID: String
})

module.exports = mongoose.model('tasks', Tasks);