'use strict';
const Produto = require('../models/produto');

exports.save = function(nome, quantidade, valor, callback){
  new Produto({
    'nome': nome,
    'quantidade': quantidade,
    'valor': valor
  }).save(function(error,produto){
    if(error){
      callback({error: 'Não foi possivel salvar'});
    } else {
      callback(produto);
    }
  });
}

exports.list = function(callback){
  Produto.find({}, function(error, produtos){
    if(error) {
      callback({error: 'Não foi possível encontrar os produtos'});
    } else {
      callback(produtos);
    }
  })
}

exports.delete = function(id, callback){
  Produto.findById(id, function(error, produto){
    if (error){
      callback({error: 'Não foi possível excluir'});
    } else {
      produto.remove(function(error){
        if(!error){
          callback({resposta: 'Produto excluído'});
        }
      });
    }
  });
}
