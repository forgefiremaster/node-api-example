'use-strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
  try{
    var data = await repository.get();
    return res.status(200).send(data);
  }catch(e){
    return res.status(400).send({message : 'Error',data: e});
  }
};

exports.getBySlug = async (req, res, next) =>{
  try {
    let data = await repository.getBySlug(req.params.slug);
    return res.status(200).send(data);
  } catch (e) {
      return res.status(400).send({message : 'Erro na requisição', data : e})
  } finally {
    console.log('getBySlug finally');
  }
};

exports.getById = async (req, res, next) =>{
  try {
    var data = await repository.getById(req.params.id);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(400).send({message : 'Error',data: e});
  } finally {
    console.log('getBySlug finally');
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(400).send({message : 'Error',data: e})
  } finally {
    console.log('getByTag finally');
  }
};

exports.post = async (req, res, next) =>{
  let contract = new ValidationContract();

  //Validadores
  contract.hasMinLen(req.body.title, 3 , 'O título deve ter pelo menos 3 caracteres.');
  contract.hasMinLen(req.body.slug, 3 , 'O slug deve ter pelo menos 3 caracteres.');
  contract.hasMinLen(req.body.description, 3 , 'A description deve ter pelo menos 3 caracteres.');

  //Se os dados forem válidos
  if (!contract.isValid()) {
   res.status(400).send(contract.errors()).end();
   return;
  }

  try {
    await repository.create(req.body);
    return res.status(201).send({message : 'Produto cadastrado com sucess!'});
  } catch (e) {
    return res.status(400).send({message : 'Error',data: e});
  } finally {
    console.log('Create');
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(201).send({message : 'Produto atualizado com sucesso'});
  } catch (e) {
    return res.status(400).send({message: 'Falha ao atualizar o produto',data:0});
  } finally {
    console.log('Update');
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    return res.status(200).send({message : 'Produto removido com sucesso!'});
  } catch (e) {
    res.status(400).send({message: 'Falha ao remover o produto',data:0});
  } finally {
    console.log("Delete");
  }
};
