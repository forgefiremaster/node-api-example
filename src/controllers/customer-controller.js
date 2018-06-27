'use-strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    return res.status(200).send(data);
  } catch (e) {
    return res.status(400).send({message : 'Erro na requisição', data : e})
  } finally {
    console.log('get customer');
  }
};

exports.post = async (req, res, next) => {
  //Validadores
  let contract = new ValidationContract();

  //contract.hasMinLen(req.body.name, 3 , 'O nome deve ter pelo menos 3 caracteres.');
  //contract.isEmail(req.body.email, 'Email inváldo.');
  //contract.hasMinLen(req.body.password, 6 , 'A Senha deve ter pelo menos 6 caracteres.');

  //Se os dados forem válidos
  //if (!contract.isValid()) {
  //  res.status(400).send(contract.errors()).end();
  //  return;
  //}

  try {
    await repository.create({
      name : req.body.name,
      email : req.body.email,
      password : md5(req.body.password + global.SALT_KEY)
    });
    return res.status(201).send({message : 'Cliente cadastrado com sucesso.'});
  } catch (e) {
    return res.status(500).send({message : 'Falha na requisição', data : e});
  } finally {
    console.log('create customer');
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email : req.body.email,
      password : md5(req.body.password + global.SALT_KEY)
    });

    if (!customer) {
      res.status(404).send({
        message : 'Email ou senha inválido.'
      })
      return;
    }

    const token = await authService.generateToken({
      email : customer.email,
      name : customer.name
     });

    return res.status(201).send({token : token, data : {name : customer.name, email : customer.email}});
  } catch (e) {
    return res.status(500).send({message : 'Falha na requisição', data : e});
  } finally {
    console.log('create customer');
  }
};
