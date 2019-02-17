'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./utils/config');

mongoose.connect(config.DATABASE,
    (err,res) => {
        if (err) {
            throw err;
        }
        console.log("Conexión a la bd establecida");

        app.listen(
            config.PORT,
            () => {
                console.log(`App running into localhost ${
                    config.PORT
                }`);
                
            }
        );
    }
);

