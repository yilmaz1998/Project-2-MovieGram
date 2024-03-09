const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../models');

router.get('/new', (req,res) => {
    res.render('newuser.ejs', {currentUser: req.session.currentUser} )
})

router.post('/', async (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
    const newUser = await db.User.create(req.body)
    console.log(newUser)
    res.redirect('/session/new')
})

module.exports = router