const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    fisrtName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    activities: {
        type: [String],
        required: true,
    },
    careerStartDate: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    careerYears: {
        type: Number,
        transient: true,
    },
    age: {
        type: Number,
        transient: true,
    },
})

module.exports = mongoose.model('Person', personSchema)
