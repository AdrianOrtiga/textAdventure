require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts  = require('express-ejs-layouts')
const path = require('path')

const indexRoute = require('./routes/index')
const createNewAdvRoute = require('./routes/createNewAdventure')
const playTextAdvRoute = require('./routes/playTextAdventure')
const textAdvRoute = require('./routes/textAdventure')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'/views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.engine('html',require('ejs').renderFile)
app.set()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the Database succesfuly'))

app.use('/', indexRoute)
app.use('/createNewAdventure', createNewAdvRoute)
app.use('/playTextAdventure', playTextAdvRoute)
app.use('/textAdventure', textAdvRoute)

app.use('/hello', (req, res) => {
    res.send('hello bro')
})

app.listen((process.env.PORT || 3000), () => console.log('Server running! You are the puto boss'))