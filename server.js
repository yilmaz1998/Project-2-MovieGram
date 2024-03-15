const express = require('express')
require('dotenv').config()
const app = express();
const db = require('./models');
const methodOverride = require('method-override') 
const session = require('express-session')

const PORT = process.env.PORT || 3000

const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController')
const sessionController = require('./controllers/sessionController')


app.use(express.json())
app.use(express.urlencoded())
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/movie', movieController)
app.use('/user', userController)
app.use('/session', sessionController)



app.listen(PORT, (req, res) => {
    console.log('Server is running', PORT)
})