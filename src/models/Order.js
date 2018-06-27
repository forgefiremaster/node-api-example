'use-strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criando novo schema da entidade de produtos
const schema = new Schema({
    number: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  createDate: {
    type: Date,
    required: true,
    default : Date.now
  },
  status: {
    type: String,
    required: true,
    enum : ['created', 'done'],
    default : 'created'
  },
  items: [
    {
    quantity :{
      type: Number,
      required : true,
      default : 1
    },
    price :{
      type: Number,
      required : true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
  }
]
});

module.exports = mongoose.model('Order', schema);
