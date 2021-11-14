const express = require('express')
const router = express.Router()
const Users = require('../model/users')
const passport = require('passport')
const initializePassport = require('../passport-config')

var LoginUsername = ''

initializePassport(
    passport, 
    async (username) => {
        return await Users.findOne({username:username})
    },
    async (id) => {
        return await Users.findOne({_id:id})
    }
)

router.get('/', (req, res) => {
    res.render('autentification/login', {username: LoginUsername})
})

router.get('/successful', (req, res) => {
    res.render('autentification/loginsuccesful', { username: req.user.username})
})

router.post('/',saveUsername, passport.authenticate('local', {
    successRedirect: '/login/successful',
    failureRedirect: '/login',
    failureFlash: true
}))

function saveUsername(req, res, next){
    LoginUsername = req.body.username
    next()
}

module.exports = router