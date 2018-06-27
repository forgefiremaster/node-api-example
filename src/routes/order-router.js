'use-strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

//GET
router.get('/', authService.authorize, controller.get);

//POST
router.post('/', authService.authorize, controller.post);

//PUT
router.put('/:id', authService.authorize, controller.put);

//DELETE
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
