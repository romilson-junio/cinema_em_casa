const Movie = require('./movie.model')
const mongoose = require('mongoose')

const cineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rooms: {
        type: [String],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    moviesTheaters: {
        type: Array,
        ref: Movie
    }
})

module.exports = mongoose.model('Cine', cineSchema)
