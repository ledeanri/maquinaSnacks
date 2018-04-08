var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartaoSchema = new Schema({
  ultima_recarga:Date,
  valor:String
});

module.exports = mongoose.model('Cartao', CartaoSchema);
