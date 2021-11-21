if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const indexRoute = require('./routes/index')
const createNewAdvRoute = require('./routes/createNewAdventure')
const playTextAdvRoute = require('./routes/playTextAdventure')
const textAdvRoute = require('./routes/textAdventure')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//app.engine('html',require('ejs').renderFile)
app.set()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the Database succesfuly'))

app.use(checkAuthenticated)
app.use('/', indexRoute)
app.use('/createNewAdventure', createNewAdvRoute)
app.use('/playTextAdventure', playTextAdvRoute)
app.use('/textAdventure', textAdvRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)


function checkAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
        app.set('layout', 'layouts/layout_log')
        return next()
    }
    
    app.set('layout', 'layouts/layout')
    next()
}  

app.listen((process.env.PORT || 3000), () => console.log('Server running! You are the puto boss'))