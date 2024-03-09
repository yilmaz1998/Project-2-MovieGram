const express = require('express')
const app = express();
const db = require('./models');
const methodOverride = require('method-override') 
const session = require('express-session')

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


app.get('/', (req,res) => {
    db.Movie.find({}).populate('user')
    .then (data => {
        res.render('home.ejs', {data})
    })
})

app.listen(3000, (req, res) => {
    console.log('Server is running')
})