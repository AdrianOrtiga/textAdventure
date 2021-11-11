const express = require('express')
const router = express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('autentification/login')
})

router.post('/', (req, res) => {
    const info = req.body
    res.send(info)
    console.log(info)
})

module.exports = router