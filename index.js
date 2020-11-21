const express = require('express');
const productList = require('./src/assets/json/products.json');

const app = express();

app.use(express.static('./src'));

app.get('/products-list/products', (req, res) => {
    res.json(productList);
});

app.listen(4444);