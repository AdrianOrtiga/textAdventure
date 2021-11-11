const express = require('express')
const router = express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('autentification/register', {
        message: null,
        username: '',
        email: '',
    })
})

router.post('/', async (req, res) => {
    const userExist = await Users.countDocuments({name:req.body.username}, { limit: 1 })
    if(userExist){
        console.log('exist')
        res.render('autentification/register',{
            message: 'Sorry, the username already exist.',
            username: req.body.username,
            email: req.body.email
        })
        return
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
        name: req.body.username,
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

module.exports = router