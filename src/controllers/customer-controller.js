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
      password : md5(req.body.password + global.SALT_KEY),
      roles : ["user"]
    });
    return res.status(201).send({message : 'Cliente cadastrado com sucesso.'});
  } catch (e) {
    return res.status(500).send({message : 'Falha na requisição', data : e});
  } finally {
    console.log('create customer');
  }
};

//Gerar token para usário
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
      id : customer._id,
      email : customer.email,
      name : customer.name,
      roles : customer.roles
     });

    return res.status(201).send({token : token, data : {name : customer.name, email : customer.email}});
  } catch (e) {
    return res.status(500).send({message : 'Falha na requisição', data : e});
  } finally {
    console.log('create customer');
  }
};

//Refresh token
exports.refreshToken = async (req, res, next) => {
  try {

    //recuperar token antes de criar um Cliente - primeiro garanta queo tken é válido
    const token = req.body.token || req.query.token || req.headers['authorization'];

    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(401).send({
        message : 'Cliente não encontrado.'
      })
      return;
    }

    const tokenData = await authService.generateToken({
      id : customer._id,
      email : customer.email,
      name : customer.name,
      roles : customer.roles
     });

    return res.status(201).send({token : tokenData, data : {name : customer.name, email : customer.email}});
  } catch (e) {
    return res.status(500).send({message : 'Falha na requisição', data : e});
  } finally {
    console.log('create customer');
  }
};

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.body.id);
    return res.status(200).send({message : 'Cliente removido com sucess.'});
  } catch (e) {
    return res.status(400).send({message : 'Erro ao remover o cliente.'});
  } finally {
    console.log('delete cliente');
  }
}
