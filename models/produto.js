var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
  nome:String,
  quantidade:Number,
  valor:Number
});

module.exports = mongoose.model('Produto', ProdutoSchema);
