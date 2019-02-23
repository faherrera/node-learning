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
        console.log("Esto trae el error", err);
        err &&  serverError500(res,{message: "Está ocurriendo un error en signUp", err:err});

        serverError200(res,null,{
            token: _authService.createToken(user),
        });

    } );
}


const signIn = (req,res) => {
    new UserModel().find(
        {email: req.body.email},
        (err, user) => {
            err && serverError500(res);

            !user 
            ? 
                serverError404(res)
            : 
                serverError200(res,null,{
                    message:"Te has logueado correctamente",
                    token: authService.createToken(user)
                }); 
            ;
        }
    );

}

module.exports = {
    signUp,
    signIn
}

