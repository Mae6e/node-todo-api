const request = require('supertest');
const expect = require('expect');

const {Todo} = require('./../models/todo');
const {app} = require('./../server');
const {ObjectID} = require('mongodb');


var text = 'go to highschool';

const todos =[{
    _id:new ObjectID(),
    text: "first todo",
    completedAt:true,
    completedAt:123456
},{
    _id:new ObjectID(),
    text: "second todo"
}]

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        Todo.insertMany(todos)
    }).then(()=>done());
})

describe('post todos',()=>{
  it('create a new todo',(done)=>{
      request(app)
     .post('/todo')
     .send({text})
     .expect(200)
     .expect((res)=>{
         expect(res.body.text).toBe(text)
     }).end((err,res)=>{
         if(err){
             done(err);
         }
         Todo.find().then((todos)=>{
             expect(todos.length).toBe(3);
             expect(todos[2].text).toBe(text);
             done();
         }).catch(err=>{
             done(err);
         })
     })
  })

  it('invalid todo for create',(done)=>{
    request(app)
   .post('/todo')
   .send({})
   .expect(400)
   .end((err,res)=>{
       if(err){
           done(err);
       }
       Todo.find().then((todos)=>{
           expect(todos.length).toBe(2);
           done();
       }).catch(err=>{
           done(err);
       })
   })
})
})

describe('get todos',()=>{
    it('get todos',(done)=>{
        request(app)
       .get('/todos')
       .expect(200)
       .expect((res)=>{
           expect(res.body.todos.length).toBe(2)
       }).end(done)
    })
  })

  describe('return todo',()=>{
    it('get todo',(done)=>{
        request(app)
       .get(`/todo/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res)=>{
           expect(res.body.todo.text).toBe(todos[0].text)
       }).end(done)
    })

    it('not found todo',(done)=>{
        request(app)
       .get(`/todo/1232`)
       .expect(404)
       .end(done)
    })
  })

  describe('delete todo',()=>{
    it('should delete todo',(done)=>{
        var hexId= todos[0]._id.toHexString();
        request(app)
       .delete(`/todo/${hexId}`)
       .expect(200)
       .expect((res)=>{
           expect(res.body.todo._id).toBe(hexId)
       }).end((err,res)=>{
           if(err){
           return done(err);
           }

            Todo.findById(hexId).then((todo)=>{
            expect(todo).toBeNull();
            done();
        }).catch(err=>{
            done(err);
        })
       })
    })

    it('not found todo',(done)=>{
        var hexId= new ObjectID().toHexString();
        request(app)
       .delete(`/todo/${hexId}`)
       .expect(404)
       .end(done)
    })

    it('non-object todo',(done)=>{
        request(app)
       .delete(`/todo/1232`)
       .expect(404)
       .end(done)
    })
  })


  describe('patch todo success',()=>{
    it('patch todo',(done)=>{
        
        var hexId= todos[0]._id.toHexString();
        var text = 'new text!';

        request(app)
       .patch(`/todo/${hexId}`)
       .send({
        completed:true,
        text
        })
       .expect(200)
       .expect((res)=>{
           expect(res.body.text).toBe(text)
           expect(res.body.completed).toBe(true)
           expect(typeof res.body.completedAt).toBe('number')

       }).end(done)
    })

    it('patch todo with false completed',(done)=>{
        
        var hexId= todos[1]._id.toHexString();
        var text = 'new text2020!';

        request(app)
       .patch(`/todo/${hexId}`)
       .send({
        completed:false,
        text
        })
       .expect(200)
       .expect((res)=>{
           expect(res.body.text).toBe(text)
           expect(res.body.completed).toBe(false)
           expect(res.body.completedAt).toBeNull()

       }).end(done)
    })
  })