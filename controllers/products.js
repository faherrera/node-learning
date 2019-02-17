'use strict'

const productModel = require('../models/product');

const {
    serverError200,
    serverError404,
    serverError500
} = require('../utils/serverMessages');

function getAllProducts(req,res){
    productModel.find(
        {},
        (err,products) =>{
            err && serverError500(res);
            products && serverError200(res,products);
        }
    );
}

function getProduct(req,res){
    const {productId} = req.params;

    productModel.findById(
        productId,
        (err,product) => {

            err && serverError500(res);

            !product
            ? serverError404(res)
            : serverError200(res,product);

        }
    );
}

function storeProduct(req,res){
    const payload = req.body;
    const product = new productModel();

    product.name = payload.name;
    product.picture = payload.picture;
    product.price = payload.price;
    product.category = payload.category;
    product.description = payload.description;

    product.save(
        (err,productStored) => {
            err && serverError500(res);

            serverError200(res, productStored);
        }
    );
}

function updateProduct(req,res){
    const {productId} = req.params;
    const newProduct = req.body;
    productModel.findByIdAndUpdate(
        productId,
        newProduct,
        (err,productUpdated) => {
            err && serverError500(500);

            !productUpdated
            ? serverError404(res)
            : serverError200(res,productUpdated);
        }

    );
}

function removeProduct(req,res){
    const {productId} = req.params;

    productModel.findByIdAndDelete(
        productId,
        (err,res) => {
            err && serverError500(500);
            
            serverError200(res,productUpdated);
        }

    );
}

module.exports = {
    getAllProducts,
    getProduct,
    storeProduct,
    updateProduct,
    removeProduct
};