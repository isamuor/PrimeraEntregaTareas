var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send('<b> hola </b> <br> <p> mundo </p>')
})

app.listen(3000)