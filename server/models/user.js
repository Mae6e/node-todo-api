const mongoose = require('mongoose');
const { default: validator } = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

   var UserSchema = new mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        minLengtt:1, 
        trim:true,
        validate:{
            validator:validator.isEmail,
            message: 'VALUE not valid'
        }
    },
    password:{type:String,required:true,minLengtt:6},
    tokens:[{
      access:{
        type:String,
        require:true
      },
      token:{
        type:String,
        require:true
      }
}]
   })

UserSchema.methods.toJSON = function(){
  var user=this;
  var objectUser = user.toObject();

  return _.pick(objectUser , ['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
  var user=this;
  var access = 'Auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

  user.tokens.push({token,access});
  return user.save().then(()=>{
    return token;
  })
}

   var User = mongoose.model('User',UserSchema);

   module.exports = {User}