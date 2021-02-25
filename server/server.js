
var bodyParser= require('body-parser');
var express = require('express');
var app = express();

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');

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

app.listen(3000,()=>{
    console.log('started on port 3000');
})


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