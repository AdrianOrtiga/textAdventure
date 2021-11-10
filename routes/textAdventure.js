const express = require('express')
const router = express.Router()
const TextAdventure = require('../model/textAdventure')

router.get('/', (req, res) => {
    res.redirect('/playTextAdventure')
})

router.get('/:nextLevel', async (req, res) => {
    const data = req.params.nextLevel.split('-')
    const id = data[0]
    const currentlevel = data[1]
    const optionClick = data[2]
    try {
        const textAdv = await TextAdventure.findById(id)
        const nextLevel = getNextLevel(currentlevel, optionClick, textAdv)
        res.render('play/textAdventure', {
            id: textAdv.id,
            title: textAdv.title,
            instructions: textAdv.levels[nextLevel].instructions,
            options: textAdv.levels[nextLevel].options,
            level: nextLevel
        })
    } catch {
        console.log('error')
    }
})

function getNextLevel(currentLevel, optionClick, textAdv) {
    if (currentLevel == 'i' || optionClick == 'i') {return 0}
    const link = textAdv.levels[currentLevel].links[optionClick]
    const nextLevel = link.split(' ')[1]
    if(nextLevel == undefined || nextLevel == null) {return currentLevel}
    
    return nextLevel
}

module.exports = router