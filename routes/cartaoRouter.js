var express = require('express');
var router = express.Router();

var cartaoController = require('../controller/cartaoController');

var moment = require('moment');

var usuarioController = require('../controller/usuarioController');

function getToken(req, res, next){
  var header = req.headers['authorization'];

  if (typeof header != 'undefined'){
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.post('/cadastrar', getToken, function(req, res){
  var token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
      var nome = req.body.nome;

      cartaoController.save(nome, function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

router.get('/mostrar_saldo/:id', function(req, res){
	var id = req.params.id;
	cartaoController.mostrar_saldo(id, function(resp){
    res.json(resp);
  });
});

module.exports = router;