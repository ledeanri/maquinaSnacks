var mongoose = require('mongoose');

var urlString = 'mongodb://localhost/maquinasnacks';

mongoose.connect(urlString, function(err, res){
  if (err){
    console.log('Não foi possível conectar a:' + urlString);
  } else {
    console.log('Conectado a: ' + urlString);
  }
});
