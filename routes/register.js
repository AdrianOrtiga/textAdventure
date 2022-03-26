const express = require('express')
const router = express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt')

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('authentification/register', {
        message: null,
        username: '',
        email: '',
    })
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    const userExist = await Users.countDocuments({username:req.body.username}, { limit: 1 })
    if(userExist){
        res.render('authentification/register',{
            message: 'Sorry, the username already exist.',
            username: req.body.username,
            email: req.body.email
        })
        return
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    try{
        const newUser = await user.save()
        res.redirect('/login')
    } catch {
        console.log('error')
    }
})


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/login/successful')
    }
    next()
}

module.exports = router