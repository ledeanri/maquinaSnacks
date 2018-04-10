'use strict';
const app = require('./config/app_config');
const db = require('./config/db_config');
const produtos = require('./routes/produtoRouter');
const usuario = require('./routes/usuarioRouter');
const cartao = require('./routes/cartaoRouter');

app.get('/', function(req, res){
  res.end('Bem vindo');
  //const produto = {nome: 'Leandro Ribeiro'};
  //res.json(pessoa);
});

app.use('/produtos', produtos);
app.use('/usuarios', usuario);
app.use('/cartao', cartao);
