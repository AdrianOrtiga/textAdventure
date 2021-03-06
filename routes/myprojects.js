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

router.get('/update:id', checkNotAuthenticated, async (req, res) => {
    try {
        const path = `/createNewAdventure/load${req.params.id}`
        res.redirect(path)
      } catch (e) {
        console.log(e)
        res.redirect('/myprojects')
      }
})

router.get('/delete:id', checkNotAuthenticated, async (req, res) => {
    try {
        await TextAdventure.deleteOne({_id:req.params.id})
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
