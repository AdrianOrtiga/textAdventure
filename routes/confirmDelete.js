const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/:id', checkNotAuthenticated, async (req, res) => {
    try {
        const textAdv = await TextAdventure.findById(req.params.id)
        res.render('pages/confirmDelete', {textAdv: textAdv})
    }
    catch (e) {
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