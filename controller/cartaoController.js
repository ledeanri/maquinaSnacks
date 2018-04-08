var Cartao = require('../models/cartao');
var moment = require('moment');

exports.save = function(nome, callback){
  Cartao.findOne({'nome':nome}, function(erro, cartao){
    if(erro) {
      callback('Deu erro');
    } else if(cartao) {
      callback('Cartão já existe');
    } else {
      var novoCartao = new Cartao();
      novoCartao.nome = nome;
      novoCartao.ultima_recarga = moment().format('YYYY-MM-DD');
      novoCartao.valor = 5.50;
      novoCartao.save(function(erro, usuario){
        if(erro) {
          callback('Deu erro');
        } else {
          callback(usuario);
        }
      });
    }
  });
}

exports.mostrar_saldo = function(id, callback){
  Cartao.findById(id, function(erro, cartao){
    if (erro){
      callback('Deu erro');
    } else if (cartao){
      callback({'saldo':cartao.valor});
    } else {
      callback('Cartão não encontrado');
    }
  });
}

exports.carga_automatica = function(id, callback){
  Cartao.findById(id, function(error, cartao){
    if (error){
      callback({error: 'Não foi possível encontrar o cartão'});
    } else {
      var data_hoje = moment().format('YYYY-MM-DD');
      if (moment(cartao.ultima_recarga) !== data_hoje){
        cartao.valor = 5.50;
        cartao.ultima_recarga = data_hoje;
        cartao.save(function(error, cartao){
          if(error){
            callback({error: 'Não foi possivel salvar'});
          } else {
            callback(cartao);
          }
        });
      }
    }
  });
}

exports.verificar_saldo = function(id, callback){

}

exports.debitar_saldo = function(id, callback){

}
