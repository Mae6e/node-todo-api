
const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text:{type:String, default:null, required:true, minLengtt:1, trim:true},
    completed:{type:Boolean, default:false},
    completedAt:{type:Number, default:null}
   });

   module.exports = {Todo}