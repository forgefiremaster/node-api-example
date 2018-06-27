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


//Definindo o midleware com bodyParser para todas as requisições serem convertidas para Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends : false }));

//Setando a rota em nossa api
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/order', orderRoute);

module.exports = app;
