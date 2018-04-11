'use strict';
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const cartaoController = require('../controller/cartaoController');

const moment = require('moment');

const usuarioController = require('../controller/usuarioController');

function recarrega_cartao(id){
	cartaoController.carga_automatica(id, function(resp, callback){
		if (!resp){
			callback('ocorreu um erro');
		}
	});
}

function getToken(req, res, next){
  let header = req.headers['authorization'];

  if (typeof header != 'undefined'){
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.post('/cadastrar', getToken, function(req, res){
  let token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
			const schema = { nome: Joi.string().min(3).required() };
			const result = Joi.validate(req.body, schema);
			if(result.error){
				res.status(400).send(result.error.details[0].message);
				return;
			}
      var nome = req.body.nome;

      cartaoController.save(nome, function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

router.get('/mostrar_saldo/:id', getToken, function(req, res){
	let token = req.token;

	usuarioController.authorize(token, function(resp){
    if (resp === true){
			const schema = { id: Joi.string().alphanum().min(3).max(30).required() };
			const result = Joi.validate(req.params, schema);
			if(result.error){
				res.status(400).send(result.error.details[0].message);
				return;
			}
			let id = req.params.id;
			recarrega_cartao(id);
			cartaoController.mostrar_saldo(id, function(resp){
		    res.json(resp);
		  });
    } else {
      res.sendStatus(403);
    }
  });
});

router.post('/comprar', getToken, function(req, res){
	let token = req.token;

	usuarioController.authorize(token, function(resp){
    if (resp === true){
			const schema = {
				id: Joi.string().alphanum().min(3).max(30).required(),
				id_produto: Joi.string().alphanum().min(3).max(30).required()
			};
			const result = Joi.validate(req.body, schema);
			if(result.error){
				res.status(400).send(result.error.details[0].message);
				return;
			}
			let id = req.body.id;
			let id_produto = req.body.id_produto;
			recarrega_cartao(id);

			cartaoController.comprar(id, id_produto, function(resp){
			  res.json(resp);
			});
    } else {
      res.sendStatus(403);
    }
  });
});

module.exports = router;
