'use-strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

//GET
router.get('/', authService.isAdmin, controller.get);

//POST
router.post('/', authService.isAdmin, controller.post);

//PUT
router.put('/:id', authService.isAdmin, controller.put);

//DELETE
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;
