const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
    },
    screenwrite: {
        type: String,
        required: true,
    },
    sinopse: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    distributor: {
        type: String,
        required: true,
    },
    yearOfManufacture: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    languages: {
        type: [String],
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    }

})

module.exports = mongoose.model('Movie', movieSchema)