'use strict';
const Usuario = require('../models/usuario');

exports.save =  function(nome, senha, callback){
  Usuario.findOne({'nome':nome}, function(erro, usuario){
    if(erro) {
      callback('Deu erro');
    } else if(usuario) {
      callback('Usuário já existe');
    } else {
      let novoUsuario = new Usuario();
      novoUsuario.nome = nome;
      novoUsuario.senha = novoUsuario.gerarSenha(senha);
      novoUsuario.token = novoUsuario.gerarToken(nome, senha);
      novoUsuario.save(function(erro, usuario){
        if(erro) {
          callback('Deu erro');
        } else {
          callback(usuario);
        }
      });
    }
  });
};

exports.login = function(nome, senha, callback){
  Usuario.findOne({'nome':nome}, function(erro, usuario){
    if(erro){
      callback('Deu erro');
    } else if(usuario) {
      if (usuario.validarSenha(senha)){
        callback(usuario.token);
      } else {
        callback('senha incorreta');
      }

    } else {
      callback('Usuário inexistente');
    }
  });
};

exports.list = function(token, callback){
  Usuario.findOne({'token':token}, function(erro, usuario){
    if (erro){
      callback('Deu erro');
    } else if (usuario){
      callback({'nome':usuario.nome});
    } else {
      callback('Usuário não encontrado');
    }
  });
}

exports.authorize = function(token, callback){
  Usuario.findOne({'token':token}, function(erro, usuario){
    if (erro){
      callback(false);
    } else if (usuario){
      callback(true);
    } else {
      callback(false);
    }
  });
}
