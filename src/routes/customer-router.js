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

//refreshToken
router.post('/refresh-token', authService.authorize, controller.refreshToken)

//delete
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
