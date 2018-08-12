var express = require('express')
var app = express()
var port = process.env.PORT || 3000

var mongojs = require('mongojs')
var db = mongojs('localhost:27017/Card', ['Kartica'])

var body_parser = require('body-parser')
app.use(body_parser.json())

var urlencodedParser = body_parser.urlencoded({
  extended: false
})

app.use(express.static(__dirname + '/static'))

app.get('/Kartica', function (req, res) {
  db.Kartica.find(function (err, docs) {
    res.json(docs)
  })
})

app.post('/Kartica', urlencodedParser, function (req, res, next) {
  console.log(req.body)

  db.Kartica.insert(req.body, function (err, docs) {
    console.log('Card date inserted successfully')
    res.json(docs)
  })
})

app.listen(port, function () {
  console.log('Node app is running on port', port)
});