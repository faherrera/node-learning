'use strict'
const authServices = require('../services/authServices');

function isAuth(req,res,next){
    
    if(!req.headers.authorization){
       return res.status(403).send({message: 'No tiene autorización'})
    } 

    const token = req.headers.authorization.split(' ')[1];
    
    const _authServices = new authServices();

    _authServices.decodeToken(token)
    .then(
        response => {
            req.user = response;
            next()
        }
    )
    .catch(
        err => {
            res.status(err.status);
        }
    )
}

module.exports = isAuth