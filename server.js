const express = require('express')
const app = express();
const db = require('./models');
const methodOverride = require('method-override') 
const session = require('express-session')

const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController')
const sessionController = require('./controllers/sessionController')
const commentController = require('./controllers/comment')
const isAuth = require('./controllers/isAuth')

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
app.use('/comment', commentController)
app.use(isAuth)


// ALL MOVIES SHOW ROUTE
app.get('/', (req,res) => {
    db.Movie.find({}).populate('user')
    .then (data => {
        res.render('home.ejs', {data, currentUser: req.session.currentUser})
    })
})

// ALL MOVIES DETAILS ROUTE
app.get('/:id', (req, res) => {
    db.Movie.findById(req.params.id).populate('user')
    .then(data => {
        res.render('detail.ejs', {data, currentUser:req.session.currentUser})
    })
})

app.listen(3000, (req, res) => {
    console.log('Server is running')
})