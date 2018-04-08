var Cartao = require('../models/cartao');

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
      var data_hoje = new Date();
      if (cartao.ultima_recarga !== data_hoje){
        cartao.valor = "5,50";
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
