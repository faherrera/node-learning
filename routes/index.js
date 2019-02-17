'use strict'
const express = require('express');
const apiRouter = express.Router();
const productEndpoint = require('./product');

apiRouter.use('/product/', productEndpoint);

module.exports = apiRouter;