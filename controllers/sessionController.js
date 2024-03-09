const bcrypt = require('bcrypt')
const router = require('express').Router()
const db = require('../models')


router.get('/new', (req,res) => {
    res.render('newsession.ejs', {currentUser: req.session.currentUser})
})

router.post('/', async (req,res) => {
    const findUser = await db.User.findOne({username: req.body.username})
    if(!findUser){
        return res.send('USER NOT FOUND')
    } else if (await bcrypt.compareSync(req.body.password, findUser.password)){
        req.session.currentUser = findUser
        res.redirect('/movie')
    } else {
        res.send('WRONG PASSWORD')
    }
})

router.delete('/', (req,res)=> {
    req.session.destroy(() => {
        res.redirect('/session/new')
    })
})

module.exports = router