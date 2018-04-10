'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  nome:String,
  quantidade:Number,
  valor:Number
});

module.exports = mongoose.model('Produto', ProdutoSchema);
