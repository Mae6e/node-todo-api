const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable Connect to DB');
    }

    console.log('Connect to DB');
    const db = client.db('TodoApp');

    db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
      console.log(JSON.stringify(docs,undefined,2))
    },(err)=>{
        console.log('Unable fetch data');
    })


    db.collection('Todos').count().then((count)=>{
      console.log(`Todos: ${count}`)
    },(err)=>{
        console.log('Unable count data');
    })

    client.close();
})