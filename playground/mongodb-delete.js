const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable Connect to DB');
    }

    console.log('Connect to DB');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndDelete({_id:new ObjectID('60313e4ccc2e232f50422a06')}).then((result)=>{
      console.log(result)
    },(err)=>{
        console.log('Unable delete data');
    })

    client.close();
})