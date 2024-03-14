const db = require('../models')
const express = require('express')
const router = express.Router();
const isAuth = require('../controllers/isAuth')

router.use(isAuth)


// NEW COMMENT ROUTE
router.get('/', (req,res) => {
    res.render('newcomment.ejs', {currentUser: req.session.currentUser})
})

// CREATE-POST COMMENT ROUTE
router.post('/', async (req, res) => {
    req.body.user = req.session.currentUser
    const newComment = await db.Comment.create(req.body);
    const updatedMovie = await db.Movie.findByIdAndUpdate(req.params.id , { $push: { comments: newComment._id} });
    console.log(newComment)
    console.log(updatedMovie)
    console.log(db.Movie(req.params.id))
    res.redirect('/') 
});

module.exports = router