var express = require('express')
var http = require('http')
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

var mongoapi = require('./mongo.api.js');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended:true}));

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
app.get('/Comments/:id', function(request, response){

  console.log("get post comments" + request.params.id);
  
  mongoapi.getCommentsById(request.params.id).then(
    function(result){
        
          console.log(JSON.stringify(result));
        response.send(JSON.stringify(result));
    }

  )


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


app.get('/user/:input', function(request, response){

    console.log("input " + request.params.input);

    mongoapi.getUser(request.params.input).then(

        function(result){
            console.log(JSON.stringify(result));
            response.send(JSON.stringify(result));

        }

    )

  }



)


app.post('/register', function(request, response){
 // console.
 //alert(request.body);
 console.log(request.body);
  var email = request.body.email;
  var username = request.body.name;

  mongoapi.saveUser({email:email, user: username}).then(
    function(){
       response.send("user registerd");
    }
  );

});

app.post('/savecomment', function(request, response){
  console.log("COMMENTTT IS "+ JSON.stringify(request.body));
  mongoapi.saveComment(request.body.postid, request.body).then(
    function(){
      response.send("comment saved");

    }

  );
});

app.post('/deletecomment', function(request, response){

  mongoapi.deleteComment(request.body.postid, request.body.commentid).then(function(){

    response.send("comment deleted");
  });

});

app.get('/test', function(req, res) {

  res.send('{"a": "Hello World"}')
});
