'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {
    serverError200,
    serverError404,
    serverError500,
} = require('./utils/serverMessages');
const ProductModel = require('./models/product'); 

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());

app.get(
    '/api/product',
    (req,res) => {
        ProductModel.find(
            {},
            (err,products) =>{
                if (err) {
                    res.status(500).send({message:"Ocurrió un mensaje", });
                }
                if (!products) {
                    res.status(404).send({message:"No hay productos", });
                }

                res.status(200).send({products});
            }
        )
    }
);

app.get(
    '/api/product/:productId',
    (req,res) => {
        const productId = req.params.productId;
        
       ProductModel.findById(productId,
            (err, product) => {
                err && serverError500(res);
                !product 
                ? 
                    serverError404(res)
                :
                    serverError200(res,product)
                               

            }
        );

       
    }
);

app.post(
    '/api/product',
    (req,res) => {
        console.log('Post de api productos', req.body);
        
        let product = new ProductModel();
        product.name = req.body.name;
        product.picture = req.body.picture;
        product.price = req.body.price;
        product.category = req.body.category;
        product.description = req.body.description;

        product.save((err,productStored)=>{
            if (err) {
                res.status(500)
                .send(
                    {message:`Error al salvar en la base de datos ${
                        err
                    }`}
                );
            }

            res.status(200)
            .send({
                message: 'Producto creado correctamente',
                product: productStored
            })
        });
    }
);

app.put(
    '/api/product/:productId',
    (req,res) => {
        let productId = req.params.productId;
        let update = req.body;

        ProductModel.findByIdAndUpdate(
            productId,
            update,
            (err,productUpdated) => {
                err && serverError500(res)

                serverError200(res,productUpdated);
            }
        );
    }
);

app.delete(
    '/api/product/:productId',
    (req, res) => {

        let productId  = req.params.productId;

        ProductModel.findById(
            productId,
            (err, product) => {
                err 
                && serverError500(res);

                product.remove(
                    err => {
                        err 
                        && serverError500(res,{
                            message: "Ocurrio un error al intentar borrar el producto " + productId 
                        });

                        serverError200(res,null);
                    }
                );
            }
        );
    }
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

