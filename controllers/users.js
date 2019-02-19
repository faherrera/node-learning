//Encargado de registro y authentication del user.
'use strict'
const mongoose = require('mongoose');
const UserModel = require('../models/user');
const {
    serverError200,
    serverError404,
    serverError500
} = require('../utils/serverMessages');

const authService = require('../services/authServices');

const signUp = (req,res) => {
    let {email,name} = req.body;
    const _authService = new authService();

    const user = new UserModel({
        email: email,
        displayName: name,
    });
    
    user.save( (err) =>{
        err &&  serverError500(res);

        serverError200(res,null,{
            token: _authService.createToken(user),
        });

    } );
}


const signIn = (req,res) => {
    ////Hacer el signIn para generar el token
}

module.exports = {
    signUp,
    signIn
}

