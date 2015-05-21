var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Usuario = require('../models/usuario');

var router = express.Router();

router.post('/autenticar', passport.authenticate('local'), function(req, res){

  res.json('');

});

router.post('/', function(req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    senha: req.body.senha
  });

  usuario.save(function(err, usuario) {
    if (err){
      res.send(err);
    } else {
      res.json(usuario);
    }
  });
});

router.get('/', function(req, res){
  Usuario.find(function(err, usuarios){

    if (err) {
      res.json(err);
    }

    res.json(usuarios);

  });
});

module.exports = router;