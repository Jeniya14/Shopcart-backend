const {MongoClient} =require('mongodb')
const uri="mongodb://localhost:27017/"
let client={};
try{
    client=new MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    console.log('db connected')
}
catch(err){
    console.log('Err while connecting with db')
}

module.exports=client