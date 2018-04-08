var Cartao = require('../models/cartao');
var Produto = require('../models/produto');
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
      novoCartao.ultima_recarga = moment();
      novoCartao.valor = 5.50;
      novoCartao.save(function(erro, cartao){
        if(erro) {
          callback('Deu erro');
        } else {
          callback(cartao);
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
      //callback({'saldo':cartao});
    } else {
      callback('Cartão não encontrado');
    }
  });
}

exports.carga_automatica = function(id, callback){
  Cartao.findById(id, function(error, cartao){

    if (!error && cartao !== null){
      var data_hoje = moment().format('YYYY-MM-DD');
      if (moment(cartao.ultima_recarga).format('YYYY-MM-DD') !== data_hoje){
        cartao.valor = 5.50;
        cartao.ultima_recarga = moment();
        cartao.save(function(error, cartao){
          if(error){
            callback(false);
          } else {
            callback(true);
          }
        });
      }
    } else {
      callback(true);
    }
  });
}

exports.comprar = function(id, id_produto, callback){
  Produto.findById(id_produto, function(error, produto){
    if (!error && produto !== null){
      if(produto.quantidade > 0){
        Cartao.findById(id, function(erro, cartao){
          if (erro){
            callback('Deu erro');
          } else if (cartao){
            if (cartao.valor > produto.valor){
              cartao.valor -= produto.valor;

              cartao.save(function(error,cartao){
                if(error){
                  callback({error: 'Não foi possivel salvar'});
                }
              });

              produto.quantidade -= 1;
              produto.save(function(error, produto){
                if(error){
                  callback({error: 'Não foi possivel salvar'});
                } 
              });

              callback('Compra efetuada com sucesso');
            } else {
              callback('Saldo insuficiente para compra');
            }
          } else {
            callback('Cartão não encontrado');
          }
        });
      } else {
        callback('Produto não disponível');
      }
    } else {
      callback('Produto não encontrado');
    }
  });
  
}
