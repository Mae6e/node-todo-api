
// const {SHA256} = require('crypto-js');
// var message='i am user number 3';

//  console.log(SHA256(message).toString());
//  console.log(message);


const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {id:10};

//sign
var token = jwt.sign(data,'ma123123');
console.log(token);

//verify
var decoded = jwt.verify(token,'ma123123');
console.log('decoded: ', decoded);