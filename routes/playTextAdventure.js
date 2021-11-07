const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/', (req, res) => {
    res.render('pages/playTextAdventure')

    
})

module.exports = router