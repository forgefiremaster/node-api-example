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
router.post('/', authService.isAdmin, controller.post); //Apenas amins podem alterar os produtos

//PUT
router.put('/:id', authService.isAdmin, controller.put);  //Apenas amins podem alterar os produtos

//DELETE
router.delete('/', authService.isAdmin, controller.delete);  //Apenas amins podem alterar os produtos

module.exports = router;
