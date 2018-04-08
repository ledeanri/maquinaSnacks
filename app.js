var app = require('./config/app_config');
var db = require('./config/db_config');
var User = require('./models/produto');
var produtoController = require('./controller/produtoController');
var produtos = require('./routes/produtoRouter');
var usuario = require('./routes/usuarioRouter');

app.get('/', function(req, res){
  res.end('Bem vindo');
  //var produto = {nome: 'Leandro Ribeiro'};
  //res.json(pessoa);
});

app.use('/produtos', produtos);
app.use('/usuarios', usuario);
