// const {SHA256} = require('crypto-js');
// var message='i am user number 3';

//  console.log(SHA256(message).toString());
//  console.log(message);

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'danger123';
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    })
})

var hashedPassword = '$2a$10$nZVkkHeWXM1MVQhDU1rajeF2csV1Ymeo9nWSev49NdtfdbUNUgWxK';
 bcrypt.compare(password,hashedPassword,(err, res)=>{
    console.log(res);
})

// var data = {id:10};

// //sign
// var token = jwt.sign(data,'ma123123');
// console.log(token);

// //verify
// var decoded = jwt.verify(token,'ma123123');
// console.log('decoded: ', decoded);