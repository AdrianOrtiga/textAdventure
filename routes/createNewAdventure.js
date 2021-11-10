const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/', (req, res) => {
    res.render('pages/createNewAdventure')
})

router.get('/test', (req, res) => {
    res.render('pages/test')
})

router.post('/test', (req, res) => {
    const info = req.body.test
    res.send(info)
    console.log(info)
})

// save project into mongodb
router.post('/', async (req, res) => {
    console.log('creating game')
    const title = req.body.title
    const description = req.body.description
    const levels = getLevelsArray(req.body)
    
    const textAdventure = new TextAdventure({
        title: title,
        description: description,
        levels: levels
    })
    
    try {
        const newTextAdventure = await textAdventure.save()
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


module.exports = router

