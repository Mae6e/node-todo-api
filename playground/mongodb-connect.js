
//const mongodb= require('mongodb');
const {MongoClient,ObjectID} = require('mongodb');
//var obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable Connect to DB');
    }

    console.log('Connect to DB');
    const db = client.db('TodoApp');
    db.collection('Todos').insertOne({
        text:"someting todo",
        completed:true
    },(err,result)=>{
        if(err){
           return console.log('Unable Add to DB',err)
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    })

    client.close();
})