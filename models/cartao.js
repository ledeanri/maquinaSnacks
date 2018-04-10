'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartaoSchema = new Schema({
  nome:String,
  ultima_recarga:Date,
  valor:Number
});

module.exports = mongoose.model('Cartao', CartaoSchema);
