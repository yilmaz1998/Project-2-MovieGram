const isAuth = (req, res, next) => {
    if(req.session.currentUser){
        return next()
    }else {
        res.redirect('/session/new')
    }
}

module.exports = isAuth