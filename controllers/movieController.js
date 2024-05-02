const db = require('../models')
const express = require('express')
const router = express.Router();
const isAuth = require('../controllers/isAuth')
const mongoose = require('mongoose')

router.use(isAuth)

// NEW COMMENT ROUTE
router.get('/every/:id/comment', (req,res) => {
    db.Movie.findById(req.params.id, req.body)
    .then (data => 
    res.render('newcomment.ejs', {data, currentUser: req.session.currentUser})
)})


// MOVIE/ID/COMMENT ROUTE, SHOWS EACH MOVIES' COMMENTS
router.get('/every/:id/comments',async (req,res) => {
    await db.Movie.findById(req.params.id, req.body)
    .populate({
        path:'comments',
        populate:{path:'user'}
    })
        .then (data => {
        res.render('comment.ejs', {data, currentUser: req.session.currentUser})
    })
})


// CREATING COMMENT 
router.post('/every/:id', async (req, res) => {
    req.body.user = req.session.currentUser
    db.Movie.findById(req.params.id, req.body)
    const newComment = await db.Comment.create(req.body)
    await db.Movie.findByIdAndUpdate(req.params.id , { $push: { comments: newComment._id} }),
    res.redirect('/movie/every')
});


// ALL MOVIES SHOW ROUTE
router.get('/every', (req,res) => {
    db.Movie.find({ user: { $ne: req.session.currentUser } }).populate('user')
    .then (data => {
        res.render('home.ejs', {data, currentUser: req.session.currentUser})
    })
})

function validateMovieId(req, res, next) {
    const movieId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.render('404.ejs');
    }
    next(); 
}


// ALL MOVIES DETAILS ROUTE
router.get('/every/:id', validateMovieId, (req, res) => {
    db.Movie.findById(req.params.id).populate('user')
    .then(data => {
        res.render('detail.ejs', {data, currentUser:req.session.currentUser})
    })
})


// I.N.D.U.C.E.S. FOR MOVIES

//INDEX ROUTE
router.get('/', (req,res) => {
    db.Movie.find({user: req.session.currentUser})
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
    db.Movie.findByIdAndDelete(req.params.id)
    .then(() => {
       res.redirect('/movie')
    })
})


//UPDATE ROUTE 
router.put('/:id', (req,res) => {
    db.Movie.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    )
    .then(data => res.redirect('/movie/'+ data._id))
})


//CREATE ROUTE
router.post('/', async (req,res) => {
    req.body.user = req.session.currentUser
    await db.Movie.create(req.body)
    res.redirect('/movie')
    console.log(req.body)
})


//EDIT ROUTE
router.get('/:id/edit', (req,res) => {
    db.Movie.findById(req.params.id)
    .then(data => {
        res.render('edit.ejs', {data, currentUser: req.session.currentUser})
    })
})


//SHOW PAGE 
router.get('/:id', validateMovieId, (req,res) => {
    db.Movie.findById(req.params.id)
    .then(data => {
        res.render('show.ejs', {data, currentUser: req.session.currentUser})
    })
})


module.exports = router