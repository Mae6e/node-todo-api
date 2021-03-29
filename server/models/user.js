const mongoose = require('mongoose');
const { default: validator } = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
   decoded = jwt.verify(token,'abc123');
  }catch(e){
    return Promise.reject();
  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.token': token,
    'tokens.access':'Auth'
  }) 
}

UserSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password, salt, (err,hash)=>{
        user.password = hash;
        next();
      })
    })
  }
  else{
    next();
  }
})

var User = mongoose.model('User',UserSchema);
module.exports = {User}