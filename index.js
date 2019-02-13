'use strict'
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());

app.get(
    '/hola/:name',
    (req,res) => {
        res.send({message: `Hola ${req.params.name || 'default'}`})
    }
);
app.listen(
    PORT,
    () => {
        console.log(`App running into localhost ${
            PORT
        }`);
        
    }
);

