const mongoose = require('mongoose');

require('dotenv').config()  

mongoose.connect(process.env.MONGODBURI)  

const db = mongoose.connection;

db.on('error', ()=> {console.log('connection error')})
db.on('connected', ()=> {console.log('connection done')})
db.on('disconnected', ()=> {console.log('connection disconnected')})


module.exports = {
    Movie: require('./movie'),
    User: require('./user')
}