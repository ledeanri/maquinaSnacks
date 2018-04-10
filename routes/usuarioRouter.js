'use strict';
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

function getToken(req, res, next){
  let header = req.headers['authorization'];

  if (typeof header != 'undefined'){
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.post('/cadastrar', function(req, res){
  const schema = {
    nome: Joi.string().min(3).required(),
    senha: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let nome = req.body.nome;
  let senha = req.body.senha;

  usuarioController.save(nome, senha, function(resp){
    res.json(resp);
  });
});

router.post('/login', function(req, res){
  const schema = {
    nome: Joi.string().min(3).required(),
    senha: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let nome = req.body.nome;
  let senha = req.body.senha;

  usuarioController.login(nome, senha, function(resp){
    res.json(resp);
  });
});

router.get('/listar', getToken, function(req, res){
  let token = req.token;

  usuarioController.list(token, function(resp){
    res.json(resp);
  });
});

module.exports = router;
