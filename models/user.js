'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = Schema({
    email: {type:String, unique:true, lowecase:true},
    displayName: {type: String},
    avatar: String,
    password: {type: String, select: false},
    signUpDate: {type: Date, default: Date.now()},
    lastSign: Date    
});

/// This func is trigger before the model will be stored in database
UserSchema.pre('save', (next) =>{
    let user = UserSchema;

    !user.isModified('password') && next(); //If the password is not modifed so next.

    Bcrypt.genSalt(10,(err, salt) => {
        err && next();

        Bcrypt.hash(user.password,salt,null,(err,hash) => {

            err && next();

            user.password = hash;
            next();



        })
    });
}); 

UserSchema.method.gravatar = function (){
    !this.email && 'https://www.gravatar.com/avatar/?s=200&d=retro';

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return  `https://www.gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = UserSchema;