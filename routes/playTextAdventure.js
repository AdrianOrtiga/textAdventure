const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/', async (req, res) => {
    try{
        const textAdv = await TextAdventure.find({})
        res.render('pages/playTextAdventure', {textAdv: textAdv})
    } catch{        
        res.redirect('/')
    }
})

router.get('/:id', async (req, res) => {
    try {
      const textAdv = await TextAdventure.findById(req.params.id)
      res.redirect('/textAdventure')
    } catch {
      res.redirect('/')
    }
})

module.exports = router