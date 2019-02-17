const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/products');
const app = express();
const apiRouter = require('./routes/');

app.use(bodyParser.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());

app.use('/api',apiRouter);

module.exports = app;