'use-strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return res.status(500).send({message : 'error na requisição.', data : e})
  } finally {
    console.log('Get order');
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      customer : req.body.customer,
      number : guid.raw().substring(0, 6),
      items : req.body.items
    });
    return res.status(201).send({message : 'Ordem de combra cadastrada.'});
  } catch (e) {
    console.log(e);
    return res.status(400).send({message : 'Erro no cadastro da ordem de compra.', data : e});
  } finally {
    console.log('Create order');
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(201).send({message : 'Ordem de compra atualizado com sucesso'});
  } catch (e) {
    console.log(e);
    return res.status(400).send({message: 'Falha ao atualizar da ordem',data:e});
  } finally {
    console.log('Update');
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    return res.status(200).send({message : 'Ordem de compra removido com sucesso!'});
  } catch (e) {
    res.status(400).send({message: 'Falha ao remover a ordem',data:0});
  } finally {
    console.log("Delete");
  }
};
