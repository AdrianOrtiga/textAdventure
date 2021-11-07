const mongoose = require('mongoose')

const TextAdventureSchema = new mongoose.Schema({
    title: {
        type: String,
        description: "title of the adventur",
        require: true
    },
    description: {
        type: Array,
        description: "What is the adventure about",
        require: true
    },
    instructions: {
        type: Array,
        description: "description of each level",
        require: true
    },
    options: {
        type: Array,
        description: "How many options have each level",
        required: true
    },
    links: {
        type: Array,
        description: "which is the text of each option",
        required: true
    }
})

module.exports = mongoose.model('TextAdventure', TextAdventureSchema)