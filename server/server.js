
var bodyParser= require('body-parser');
var express = require('express');
var app = express();

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {ObjectID}=require('mongodb');

app.use(bodyParser.json());
app.post('/todo',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todo/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
     res.status(404).send();

    Todo.findById(id).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send({todo});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.delete('/todo/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
     res.status(404).send();

    Todo.findByIdAndDelete({_id:new ObjectID(id)}).then((todo)=>{
        if(!todo) res.status(404).send();
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


app.listen(3000,()=>{
    console.log('started on port 3000');
})


module.exports ={app};

// var newTodo =new Todo({
//     text:'eat dinner',
//     completed:true,
//     completedAt:13991114
// })

// newTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined,2));
// },(err)=>{
//     console.log('unable to save todo',err);
// })