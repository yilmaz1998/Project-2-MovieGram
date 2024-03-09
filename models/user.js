const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    mail: {type:String, required:true, unique:true},
    location: {type:String, required:true}
})

module.exports = mongoose.model('user', UserSchema)