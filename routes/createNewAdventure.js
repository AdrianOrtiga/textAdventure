const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('pages/createNewAdventure')
})

// save project into mongodb
router.post('/', checkNotAuthenticated, async (req, res) => {
    console.log('creating game')
    const levels = getLevelsArray(req.body)

    const textAdventure = new TextAdventure({
        title: req.body.title,
        description: req.body.description,
        levels: levels,
        user: req.user.username
    })
    
    try {
        const newTextAdventure = await textAdventure.save()
        res.redirect(`textAdventure/${newTextAdventure.id}-i-i`)
        //res.redirect(`authors/${newAuthor.id}`)
    } catch {
        console.log('uff algo a ido muy mal')
        // res.render('authors/new', {
        //     author: author,
        //     errorMessage: 'Error creating Author'
        // })
    }
})

function getLevelsArray(body){
    let levels = []
    for (level = 0; level <= body.levelCounts; level++) {
        const instructions = body.instructions[level]
        const options = getOptionsArray(body, level)
        const links = getLinksArray(body, level)
        levels.push({
                level: level, 
                instructions: instructions,
                options: options,
                links: links
            })
    }
    return levels
}

function getOptionsArray(body, level) {
    let optionsArray = []
    const nextOptions = `options${level}`
    optionsArray = body[nextOptions]
    return optionsArray
}

function getLinksArray(body) {
    let linksArray = []
    const nextLinks = `links${level}`
    linksArray = body[nextLinks]
    return linksArray
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
        return
    }

    res.redirect('/playTextAdventure')
}


module.exports = router

