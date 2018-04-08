var Cartao = require('../models/cartao');
var moment = require('moment');

exports.mostrar_saldo = function(id, callback){
  Cartao.findById(id, function(error, cartao){
    if (error){
      callback({error: 'Não foi possível encontrar o cartão'});
    } else {
      callback({'saldo':cartao.valor});
    }
  });
}

exports.carga_automatica = function(id, callback){
  Cartao.findById(id, function(error, cartao){
    if (error){
      callback({error: 'Não foi possível encontrar o cartão'});
    } else {
      var data_hoje = moment().format('YYYY-MM-DD');
      if (cartao.ultima_recarga !== data_hoje){
        cartao.valor = "5,50";
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
