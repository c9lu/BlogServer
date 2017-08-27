var MangoClient = require('mongodb').MongoClient; 

var getPostsCollection = function(db){
  
    var database = db;
    var dbresult =  database.collection('posts').find({}, {_id:0}).toArray(
        function (err, result){
            console.log(result);
            return result
        });
  
       
};
  
   
var dbConnect = function()
{ 

 
      // return MangoClient.connect("mongodb://127.0.0.1:27017/blog")
 
   return MangoClient.connect("mongodb://blog-posts:mTtYNsHLRcNzaJuLkS0lMARrz4K1GgpTTZBpRGT9xNTF7q7HR7HA7vCHd0SlqhdKnVDAaVs7o2DOrXngOx5U0A==@blog-posts.documents.azure.com:10250/blog?ssl=true")
     .then( function(_Db){ 

       
       
         return _Db;
       }).catch((Err)=>{

          console.log('connection error '+Err);
      })
       
}

 


var getDataPromise= function(db)
{
    var promise= new Promise(
        function(resolve, reject){
                  db.collection('posts').find().toArray(
                  
                    function(err, result){
                         
                            
                            resolve(result);
              })
            })
    return promise;
}
exports.getAllPosts = function(){  
    

   return dbConnect().then (
       function(db) {
            return db.collection('posts').find({}, {_id:0}).sort({id: -1}).toArray();
        });
}

exports.getPostsByCategory = function(_category){
    console.log(_category);
   // alert(_category);
    return dbConnect().then(
        function(db){
            try{
            var dt= db.collection('posts').find({category:_category}).sort({id:-1}).toArray();
            debugger;
            console.log(dt);
           
           return  Promise.resolve(dt);//resove returns a promise 
            }catch(err)
            {
                 console.log(err);
              return Promise.reject(err);
               
            }
    }
    );
}
exports.getUser_callback=function(_name, callbackfunc){
     
   return dbConnect().then(
        function(db){
        
          console.log("_name is ?????"+_name);
          db.collection('users').findOne({
              user:_name
          },
         function(err, result){
             console.log("hiiii" + result);
            callbackfunc(result);
        
       
        }

    );

});
}

exports.getUser=function(_input){
   return dbConnect().then(
        function(db){
         
          return db.collection('users').findOne({
             $or: [{"user":_input},{"email":_input}]
          }
         
         );
          
        }

    );

}

exports.getCommentsById = function(_id){
     
    console.log('lets get comment by id');
    return dbConnect().then(function(db){
          
               return db.collection('posts').findOne({id:parseInt(_id)},{postcomments:1});
       
            });

   

}

exports.getPostsByIds = function(postsStr){
    console.log(postsStr);
    var postids = []; 
    postsStr.split('_').forEach( function(v){
            postids.push(parseInt(v,10));

    });
    console.log(postids);
    return dbConnect().then(
        function(db){
               try{
                    var dt= db.collection('posts').find({id:{$in: postids}} ).toArray();
                    console.log(dt);
                    return dt;
               }
                 catch(err){
                     console.log("df"+err);
                 }
    }
    );
}
exports.getPostById = function(_id){

    return dbConnect().then(
        function(db){
            return   db.collection('posts').findOne({id: parseInt(_id, 10)});
           
        }

        
    );
}

exports.saveUser = function(user){
    return dbConnect().then(

        function(db){
            console.log('ha'+user.user);
            console.log('ha'+user.email);
            return  db.collection('users').save({"user":user.user, "email":user.email})
        }
            ).catch(function(err){
        console.log('error is '+err);

    });

}

exports.saveComment = function(postid, comment){
   
   return dbConnect().then(
        function(db){
             
               return new Promise(db.collection('posts').update({id:parseInt(postid)},{$push:{postcomments: comment}
                })).catch(function(err){

                    console.log('upddate err '+err);
                });

        }
    ).catch(function(err){
        console.log(err);
    })

}

exports.deleteComment = function(postid, commentid){
    return dbConnect().then(function(db){

        var updatestring ="postcomments.$.id";
        var promise = new Promise((resolve, reject)=>{
            console.log("hello world");
            db.collection('posts').update({id:parseInt(postid)}, {$pull:{"postcomments":{id: commentid}}})
             resolve("ok");
        })
        return promise;
       

    })

}
exports.deleteUsers = function()
{
  return  dbConnect().then(function(db){
         db.collection('users').remove({});

    })

}

  


 

 

