const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        min: 3,
        max: 20
    }, description: {
        type: String,
    }, isCompleted: {
        type: Boolean,
        default: false
    }, 

}, { timestamps: true })
module.exports = mongoose.model("todos", todoSchema)