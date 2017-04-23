var express = require('express')
var http = require('http')

var app = express();
var server = http.createServer(app);

var mongoapi = require('./mongo.api.js');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});


app.listen(process.env.PORT||5000, function() {
  console.log('listening on 5000')

  
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

app.get('/MPosts/:id', function(request, response){
 
 
   mongoapi.getPostsByIds(request.params.id).then(
      function(result){
          console.log(JSON.stringify(result));
        response.send(JSON.stringify(result));

      }

   );
});
app.get('/category/:id', function(request, response){
  console.log("category"+ request.params.id)
  mongoapi.getPostsByCategory(request.params.id).then(

    
          function(result){
              console.log(JSON.stringify(result));
              response.send(JSON.stringify(result));

          }

      

  );
});


app.get('/test', function(req, res) {

  res.send('{"a": "Hello World"}')
});
