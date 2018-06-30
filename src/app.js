'use-strict'

//Pacote mvc
const express = require('express');

//Pacote JSON decode
const bodyParser = require('body-parser');

//Conexão com o mongo
const mongoose = require('mongoose');

//Criando o application
const app = express();

//carregando os models
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

//Arquivo global de configuração
const config  = require('./config');

//Conectando com o banco de dados mongoDb
mongoose.connect(config.connectionString);

//Carregar as rotas
const indexRoute = require('./routes/index');
const productRoute = require('./routes/product-router');
const customerRoute = require('./routes/customer-router.js');
const orderRoute = require('./routes/order-router.js');


//Definindo o midleware com bodyParser para todas as requisições serem convertidas para Json, com limite
//de 5 megas no corpo da requisição, mas pode aumentar se queiser
app.use(bodyParser.json({
  limit : '5mb'
}));
app.use(bodyParser.urlencoded({ extends : false }));

//Habilitar CORS ->IMPORTANTE
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, authorization');
  res.header('Access-Control-Allow-Methods','GET, POST, DELETE, PUT');
  next();
});

//Setando a rota em nossa api
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/order', orderRoute);

module.exports = app;
