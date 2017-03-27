
/**
 * Module dependencies.
 */

var express = require('express')
 
var http = require('http')


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 4000);

});


app.get('/hi', function(req, res) {
// res.render('index.html')
  res.send('{"a": "Hello World"}')
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
