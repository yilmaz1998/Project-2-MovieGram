const movie = require('../models/movie')
const express = require('express')
const router = express.Router();
const isAuth = require('../controllers/isAuth')

router.use(isAuth)


// I.N.D.U.C.E.S.

//INDEX ROUTE
router.get('/', (req,res) => {
    movie.find({user: req.session.currentUser._id})
    .then(data => {
        res.render('index.ejs', {data, currentUser: req.session.currentUser})
    })
})


//NEW ROUTE
router.get('/new', (req,res) => {
    res.render('new.ejs', {currentUser: req.session.currentUser})
})

//DELETE ROUTE
router.delete('/:id', (req,res) => {
    movie.findByIdAndDelete(req.params.id)
    .then(() => {
       res.redirect('/movie')
    })
})


//UPDATE ROUTE 
router.put('/:id', (req,res) => {
    movie.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    )
    .then(data => res.redirect('/movie/'+ data._id))
})


//CREATE ROUTE
router.post('/', async (req,res) => {
    req.body.user = req.session.currentUser
    await movie.create(req.body)
    res.redirect('/movie')
    console.log(req.body)
})


//EDIT ROUTE
router.get('/:id/edit', (req,res) => {
    movie.findById(req.params.id)
    .then(data => {
        res.render('edit.ejs', {data, currentUser: req.session.currentUser})
    })
})


//SHOW PAGE 
router.get('/:id', (req,res) => {
    movie.findById(req.params.id)
    .then(data => {
        res.render('show.ejs', {data, currentUser: req.session.currentUser})
    })
})

module.exports = router