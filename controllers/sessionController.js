const bcrypt = require('bcrypt')
const router = require('express').Router()
const db = require('../models')


router.get('/new', (req,res) => {
    res.render('newsession.ejs', {currentUser: req.session.currentUser})
})

router.post('/', async (req,res) => {
    const foundUser = await db.User.findOne({
        username: req.body.username
    })
    if(!foundUser){
        return res.send('WRONG USER')
    }else if (await bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        res.redirect('/movie/every')
    }else {
        res.send('WRONG PASSWORD')
    }
})

router.delete('/', (req,res)=> {
    req.session.destroy(() => {
        res.redirect('/session/new')
    })
})

module.exports = router