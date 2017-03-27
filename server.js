
/**
 * Module dependencies.
 */

var express = require('express')
 
var http = require('http')


var app = express();

var mongoapi = require('./mongo.api.js');

app.configure(function(){
  app.set('port', process.env.PORT || 4000);

});


app.get('/hi', function(req, res) {
// res.render('index.html')
  res.send('{"a": "Hello World"}')
});
app.get('/', function(req, res){

  mongoapi.getAllPosts().then
  (
    function (result){
      
      res.send(JSON.stringify(result));

    } 
  ); 
});

app.get('/Posts/:id', function(request, response){
  console.log("[app.get posts] " + request.params.id);
    mongoapi.getPostById(request.params.id).then(
      function(result){
        console.log(JSON.stringify(result));
        response.send(JSON.stringify(result));
      }

    );
}
);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
