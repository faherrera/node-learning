'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../utils/config');

function isAuth(req,res,next){
    !req.headers.authorization && 
    res.status(403).send({message: 'No tiene autorización'})

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, config.SECRET_TOKEN);
    
    (payload.exp <= moment.unix()) && res.status(401).send({message: 'El token ha expirado'})

    req.user = payload.sub;
    next()

}

module.exports = {
    isAuth
}