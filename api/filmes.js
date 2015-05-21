var express       = require('express');
var passport      = require('passport');

var Filme = require('../models/filme');

var router = express.Router();

function auth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    next();
  }
}

router.get('/', auth, function(req, res){
  Filme.find(function(err, filmes){

    console.log(req.user);

    if (err) {
      res.json(err);
    }

    res.json(filmes);

  });
});

router.get('/:id', function(req, res){
  Filme.findById(req.params.id, function(err, filme) {
    if (err) res.json(err);

    res.json(filme);    
  });
});

router.post('/', function(req, res){

  var filme = new Filme({
    titulo: req.body.titulo,
    tituloOriginal: req.body.tituloOriginal,
    dataEstreia: req.body.dataEstreia,
    genero: req.body.genero
  });

  filme.save(function(err, filme) {
    if (err){
      res.send(err);
    } else {
      res.json(filme);
    }
  });

});

router.put('/:id', function(req, res){

  var query = { _id: req.params.id };
  var options = { new: true };

  Filme.findOneAndUpdate(query, {
    titulo: req.body.titulo,
    tituloOriginal: req.body.tituloOriginal,
    dataEstreia: req.body.dataEstreia,
    genero: req.body.genero
  }, options, function(err, filme) {
    if (err) res.json(err);

    res.json(filme);
  });

});

router.delete('/:id', function(req, res) {
  var query = { _id: req.params.id };

  Filme.remove(query, function(err, filme) {
    if (err) 
      res.json(err);

    res.json(filme);
  });
});

module.exports = router;