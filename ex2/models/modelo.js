const mongoose = require('mongoose');

const nome = "nome"

var schema = new mongoose.Schema({
    atr1: String,
    atr2: Int
})

module.exports = mongoose.model(nome,schema);