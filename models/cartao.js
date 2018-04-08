var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartaoSchema = new Schema({
  nome:String,
  ultima_recarga:Date,
  valor:Number
});

module.exports = mongoose.model('Cartao', CartaoSchema);
