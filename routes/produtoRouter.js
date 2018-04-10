'use strict';
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

const produtoController = require('../controller/produtoController');

function getToken(req, res, next){
  let header = req.headers['authorization'];

  if (typeof header != 'undefined'){
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/', getToken, function(req, res){
  let token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
      produtoController.list(function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });

});

router.post('/cadastrar', getToken, function(req, res){
  const schema = {
    nome: Joi.string().alphanum().min(3).max(30).required(),
    quantidade: Joi.string().alphanum().min(3).max(30).required(),
    valor: Joi.string().alphanum().min(3).max(30).required()
  };
	const result = Joi.validate(req.body, schema);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}
  let token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
      let nome = req.body.nome;
      let quantidade = parseInt(req.body.quantidade);
      let valor = parseFloat(req.body.valor.replace(',', '.'));

      produtoController.save(nome, quantidade, valor, function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

router.delete('/deletar/:id', getToken, function(req, res){
  const schema = { nome: Joi.string().min(3).required() };
  const result = Joi.validate(req.params, schema);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
      let id = req.params.id;

      produtoController.delete(id, function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

module.exports = router;
