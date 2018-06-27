'use-strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

//GET
router.get('/', authService.authorize, controller.get);

//GET by slug
router.get('/:slug', authService.authorize, controller.getBySlug);

//GET By ID
router.get('/admin/:id', authService.authorize, controller.getById);

//GET BY TAG
router.get('/tags/:tag', authService.authorize, controller.getByTag);

//POST
router.post('/', authService.authorize, controller.post);

//PUT
router.put('/:id', authService.authorize, controller.put);

//DELETE
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
