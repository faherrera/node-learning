'use strict'
const express = require('express');
const apiRouter = express.Router();
const productEndpoint = require('./product');
const isAuthMiddle = require('../middlewares/auth');

apiRouter.use('/product', productEndpoint);
apiRouter.get('/private', isAuthMiddle, (req,res) => 
{
    res.status(200).send({
        message:"Teneis acceso coño!!!"
    })
});
module.exports = apiRouter;