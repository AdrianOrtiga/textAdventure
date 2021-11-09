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
    const instructions = req.body.instructions
    const options = getOptionsArray(req.body)
    const links = getLinksArray(req.body)
    const levels = getLevelsArray(req.body)

    const textAdventure = new TextAdventure({
        title: title,
        description: description,
        instructions: instructions,
        options: options,
        links: links
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

function getOptionsArray(body) {
    let optionsArray = []
    for (level = 0; level <= body.levelCounts; level++) {
        const nextOptions = `options${level}`
        optionsArray.push(body[nextOptions])
    }
    return optionsArray
}

function getLinksArray(body) {
    let linksArray = []
    for (level = 0; level <= body.levelCounts; level++) {
        const nextLinks = `links${level}`
        linksArray.push(body[nextLinks])
    }
    return linksArray
}

function getLevelsArray(body){
    let levels = []
    for (level = 0; level <= body.levelCounts; level++) {
        const instructions = req.body.instructions[level]
        const options = `options${level}`
        const links = `links${level}`
        levels.push({
                level: level, 
                instructions: instructions,
                options: options,
                links: links
            })
        optionsArray.push(body[nextOptions])
        linksArray.push(body[nextLinks])
    }
}

module.exports = router

