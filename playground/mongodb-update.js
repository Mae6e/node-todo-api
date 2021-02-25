const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable Connect to DB');
    }

    console.log('Connect to DB');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({_id:new ObjectID('60301169ebe5583ea8cddd7b')},{
        $set:{
            text:'go to bed'
        }
    },{returnOriginal:false})
    .then((result)=>{
      console.log(result)
    },(err)=>{
        console.log('Unable update data');
    })
    
    client.close();
})