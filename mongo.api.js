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
   try{
 
    //   return MangoClient.connect("mongodb://127.0.0.1:27017/blog");
       return MangoClient.connect("mongodb://blog-posts:mTtYNsHLRcNzaJuLkS0lMARrz4K1GgpTTZBpRGT9xNTF7q7HR7HA7vCHd0SlqhdKnVDAaVs7o2DOrXngOx5U0A==@blog-posts.documents.azure.com:10250/blog?ssl=true");
   }
   catch (e){
        console.log(e);

   }
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
    return dbConnect().then(
        function(db){
            try{
            var dt= db.collection('posts').find({category:_category}).sort({id:-1}).toArray();
            console.log(dt);
            return dt;
            }catch(err)
            {
                console.log(err);
            }
    }
    );

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
                 //db.inventory.find( { status: { $in: [ "A", "D" ] } } )
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
console.log(this.getPostsByIds("1_2_3"));

  


 

 
module.exports.getAllPosts();

