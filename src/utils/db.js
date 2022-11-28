const mongoose = require('mongoose')
const mongodbUrl = 'mongodb://localhost/cinema?authSource=admin'
const messages = require('../utils/bundle')

mongoose.connect(mongodbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: 'cinema',
    pass: '123456'
})

const db = mongoose.connection

db.on('error', (err) => console.error(`Error: ${err}`))
db.on('connected', (err, res) => console.log(messages.connectedDatabase))