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
    const productData = req.body;
    const newProduct = new productModel();

    product.name = productData.name;
    product.picture = productData.picture;
    product.price = productData.price;
    product.category = productData.category;
    product.description = productData.description;

    newProduct.save(
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
        {
            upsert:true
        },
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