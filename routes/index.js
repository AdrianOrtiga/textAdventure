const express = require('express')
const router = express.Router()
const users = require('../model/users')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('pages/login')
})

router.post('/login', (req, res) => {
    const info = req.body.test
    res.send(info)
    console.log(info)
})

router.get('/register', (req, res) => {
    res.render('pages/register')
})

router.post('/register', (req, res) => {
    const info = req.body.test
    res.send(info)
    console.log(info)
})

module.exports = router