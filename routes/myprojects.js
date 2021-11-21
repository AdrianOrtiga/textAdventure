const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/', checkNotAuthenticated, async (req, res) => {
    try{
        const textAdv = await TextAdventure.find({user: req.user.username})
        res.render('pages/myprojects', {textAdv: textAdv})
    } catch{        
        res.redirect('/')
    }
})

router.get('/delete:id', async (req, res) => {
    try {
        await TextAdventure.remove({_id:req.params.id})
        res.redirect('/myprojects')
      } catch (e) {
        console.log(e)
        res.redirect('/myprojects')
      }
})

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
        return
    }

    res.redirect('/playTextAdventure')
}

module.exports = router
