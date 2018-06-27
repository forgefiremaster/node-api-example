'use-strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

//GET
router.get('/', authService.authorize, controller.get);

//POST
router.post('/', authService.authorize, controller.post);

//authenticate
router.post('/authenticate', controller.authenticate)

module.exports = router;
