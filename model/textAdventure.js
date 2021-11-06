const mongoose = require('mongoose')

const textAdventureSchema = new mongoose.Schema({
    optionsCount: {
        type: Array,
        description: "How many options have each level",
        required: true
    },
    optionsValues: {
        type: Array,
        description: "which is the text of each option",
        required: true
    }
})

/********************

var optionsCount = [2] // how many options have each level
var optionValues = [[]] // the text of the option of each levels
var levelsCount = 0 // how many levels there are
var instructLvlsValues = [] // the description of each levels.
var linkValues = [[]] // link value select in the option of each level

**************/