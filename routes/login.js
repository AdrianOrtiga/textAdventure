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

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('autentification/login', {username: LoginUsername})
})

router.get('/successful', (req, res) => {
    res.render('autentification/loginsuccesful', { username: req.user.username})
})

router.post('/', checkNotAuthenticated, saveUsername, passport.authenticate('local', {
    successRedirect: '/login/successful',
    failureRedirect: '/login',
    failureFlash: true
}))

router.delete('/', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function saveUsername(req, res, next){
    LoginUsername = req.body.username
    next()
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/login/successful')
    }
    next()
}

module.exports = router