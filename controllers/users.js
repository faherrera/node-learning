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
const _authService = new authService();

const signUp = (req,res) => {
    let {email,name} = req.body;

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
    console.clear();
    console.log('Estoy entrando por SignIn', req.body);
    let _user = UserModel;

    try {
        _user.findOne(
            {email: req.body.email},
            (err, user) => {
                if (err) return serverError500(res);
                
                !user 
                ? 
                    serverError404(res)
                : 
                    serverError200(res,null,{
                        message:"Te has logueado correctamente",
                        token: _authService.createToken(user)
                    }); 
                ;
            }
        );
        
    } catch (error) {
        serverError500(res, {error:error.message});
    }

}

module.exports = {
    signUp,
    signIn
}

