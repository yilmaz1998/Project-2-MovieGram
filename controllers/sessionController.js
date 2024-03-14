const bcrypt = require('bcrypt')
const router = require('express').Router()
const db = require('../models')


router.get('/new', (req,res) => {
    res.render('newsession.ejs', {currentUser: req.session.currentUser})
})

router.post('/', async (req,res) => {
   const findUser = await db.User.findOne({username: req.body.username})
//     if(!findUser){
//         return res.send('USER NOT FOUND')
     const isUser = await bcrypt.compareSync(req.body.password, findUser.password)
        req.session.currentUser = {
            "_id": "65f32c7d11f54cae5b0da3c4",
            "username": "Sinan",
            "password": "$2b$12$iaULIYRLWAkgdfGRbhe9uONlxWdN4EJs8buMpP9NpAqCsTuqI9WR6",
            "mail": "snn.ylmz9804@gmail.com",
            "location": "NY",
            "__v": 0
            }
//         // res.redirect('/movie')
//         res.send('index')
//     } else {
//         res.send('WRONG PASSWORD')
//     }}catch(error){
//         res.send(error)
//     }
if (isUser) {
    req.session.currentUser = findUser
    res.redirect('/movie')
}
})

router.delete('/', (req,res)=> {
    req.session.destroy(() => {
        res.redirect('/session/new')
    })
})

module.exports = router