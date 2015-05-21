var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FilmeSchema   = new Schema({
    titulo: String,
    tituloOriginal: String,
    dataEstreia: Date,
    genero: String
});

module.exports = mongoose.model('Filme', FilmeSchema);