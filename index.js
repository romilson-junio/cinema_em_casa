const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('cinema-api is running')
})

app.use((error, req, res, next) => {
    console.log('ERRO', error) 
    res.status(500).json({errorMessage: error.message})
 })

app.listen(port, () => {
    console.log(`cinema-api running on port ${port}`)
})