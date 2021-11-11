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
    levels: {
        type: Array,
        description: "all levels of the game",
        require: true
    },
    user: {
        type: String,
        description: "user that have created the project",
        default: "nameless"
    }
})

module.exports = mongoose.model('TextAdventure', TextAdventureSchema)