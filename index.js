'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {
    serverError200,
    serverError404,
    serverError500,
} = require('./utils/serverMessages');
const productController = require('./controllers/products');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());

app.get(
    '/api/product',
    productController.getAllProducts
);

app.get(
    '/api/product/:productId',
    productController.getProduct
);

app.post(
    '/api/product',
    productController.storeProduct
);

app.put(
    '/api/product/:productId',
    productController.updateProduct
);

app.delete(
    '/api/product/:productId',
    productController.removeProduct
);

mongoose.connect('mongodb://localhost:27017/shop',
    (err,res) => {
        if (err) {
            throw err;
        }
        console.log("Conexión a la bd establecida");

        app.listen(
            PORT,
            () => {
                console.log(`App running into localhost ${
                    PORT
                }`);
                
            }
        );
    }
);

