var express = require('express');
var app = express();
var port = process.env.PORT || 8080

app.use(express.static(__dirname + '/static'));
app.get('/', (req, res) => res.sendStatus(200));


app.listen(port,function(){
  console.log('Node app is running on port', port);
});