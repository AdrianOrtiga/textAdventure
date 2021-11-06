const express = require('express')
const router = express.Router()

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

router.post('/', (req, res) => {
    console.log('creating game')
    res.send(req.body)
})

module.exports = router