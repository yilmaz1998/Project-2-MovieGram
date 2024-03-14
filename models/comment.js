const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: String,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
    movie: {type:mongoose.Schema.Types.ObjectId, ref: 'movie' }
})


const comment = mongoose.model('comment', commentSchema) 

module.exports = comment