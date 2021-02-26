const request = require('supertest');
const expect = require('expect');

const {Todo} = require('./../models/todo');
const {app} = require('./../server');
var text = 'go to highschool';

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>done());
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
             expect(todos.length).toBe(1);
             expect(todos[0].text).toBe(text);
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
           expect(todos.length).toBe(0);
           done();
       }).catch(err=>{
           done(err);
       })
   })
})
})