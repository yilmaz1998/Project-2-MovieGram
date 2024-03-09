const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: String,
    img: String,
    type: String,
    year: Number,
    actors: String,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
    
})

const movie = mongoose.model('movie', movieSchema) 

module.exports = movie