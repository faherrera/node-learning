'use strict'
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3005;

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

