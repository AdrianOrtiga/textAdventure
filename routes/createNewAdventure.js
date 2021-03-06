const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

var project_id = null

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('pages/createNewAdventure', {updateAdv: false})
})

router.get('/load:id', async (req, res) => {
    try {
        project_id = req.params.id
        const textAdv = await TextAdventure.findOne({_id:project_id})
        res.render('pages/createNewAdventure', {updateAdv: true, textAdv: textAdv})
      } catch (e) {
        console.log(e)
        res.redirect('/myprojects')
      }
})

// save project into mongodb
router.post('/', checkNotAuthenticated, async (req, res) => {
    const levels = getLevelsArray(req.body)
    const textAdventure = new TextAdventure({
        title: req.body.title,
        description: req.body.description,
        levels: levels,
        user: req.user.username
    })
    try {
        const newTextAdventure = await textAdventure.save()
        console.log(newTextAdventure.id)
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

router.post('/load:id', checkNotAuthenticated, async (req, res) => {
    try {
        project_id = req.params.id
        await TextAdventure.updateOne({_id:project_id},{title:req.body.title})
        await TextAdventure.updateOne({_id:project_id},{title:req.body.description})

        const levels = getLevelsArray(req.body)    
        await TextAdventure.updateOne({_id:project_id},{levels:levels})    
    
        res.redirect(`/textAdventure/${project_id}-i-i`)
    } catch {
        console.log('error: ', e)
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

async function deleteOldProject(){
    try {
        const textAdv = await TextAdventure.findOne({_id:project_id})
        textAdv.remove()
    } catch (e) {
        console.log('error: ', e)
    }
}

module.exports = router
