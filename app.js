const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./routes/');
const hbs = require('express-handlebars');


app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(bodyParser.json());

app.engine('.hbs',
hbs({
    defaultLayout: 'default',
    extname:'.hbs'
})); //Config hbs
app.set('view engine','.hbs');

app.use('/api',apiRouter);
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/products', (req, res) => {
    res.render('products');
});

module.exports = app;