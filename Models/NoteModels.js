const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
})

const noteModel = mongoose.model('notes', noteSchema)

module.exports = noteModel