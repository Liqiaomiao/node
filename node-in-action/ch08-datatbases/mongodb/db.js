const {MongoClient, ObjectId} = require('mongodb')
let database;
module.exports = ()=>{
    return MongoClient
        .connect('mongodb://localhost:27017/articles',{useUnifiedTopology: true})
        .then(client=>{
            console.log('connecting')
            database = client.db('articles')
        }).catch(err=>{
            console.log('connect error',err);
        })
}
module.exports.Article = {
    all(){
        return  database.collection('articles').find().sort({title:1}).toArray()
    },
    create(data){
        return database.collection('articles').insertOne(data,{w:1})
    },
    find(_id){
       if(typeof _id!=='object') _id=ObjectId(_id);
        console.log(typeof _id,_id);
        return database.collection('articles').findOne({_id})
    },
    getTimesTamp(id){
        const timesTamp = ObjectId(id).getTimestamp()
        console.log(timesTamp);
    },
    assertIdType(){

    }
}