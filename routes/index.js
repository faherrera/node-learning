'use strict'
const express = require('express');
const apiRouter = express.Router();
const productEndpoint = require('./product');
const isAuthMiddle = require('../middlewares/auth');
const userController = require('../controllers/users');

apiRouter.use('/product',isAuthMiddle, productEndpoint);
apiRouter.post('/signup',userController.signUp);
apiRouter.post('/signin',userController.signIn);
apiRouter.get('/private', isAuthMiddle, (req,res) => 
{
    res.status(200).send({
        message:"Teneis acceso coño!!!",
        token: req.headers.authorization
    })
});
module.exports = apiRouter;