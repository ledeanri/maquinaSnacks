var express = require('express');
var router = express.Router();
var usuarioController = require('../controller/usuarioController');

var produtoController = require('../controller/produtoController');

function getToken(req, res, next){
  var header = req.headers['authorization'];

  if (typeof header != 'undefined'){
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/', getToken, function(req, res){

  var token = req.token;

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
  var token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
      var nome = req.body.nome;
      var quantidade = parseInt(req.body.quantidade);
      var valor = parseFloat(req.body.valor.replace(',', '.'));

      produtoController.save(nome, quantidade, valor, function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

router.delete('/deletar/:id', getToken, function(req, res){
  var token = req.token;

  usuarioController.authorize(token, function(resp){
    if (resp === true){
      var id = req.params.id;

      produtoController.delete(id, function(resp){
        res.json(resp);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

module.exports = router;
