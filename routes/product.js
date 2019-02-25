'use strict'
const express = require('express');
const productController = require('../controllers/products');
const productEndpoint = express.Router();

productEndpoint.get('/', productController.getAllProducts);

productEndpoint.get('/:productId', productController.getProduct);

productEndpoint.post('/', productController.storeProduct);

productEndpoint.put('/:productId', productController.updateProduct);

productEndpoint.delete('/:productId', productController.removeProduct);

module.exports = productEndpoint;