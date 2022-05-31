var Cidade = require("../models/cidades.js");
var mongoose = require("mongoose");

module.exports.nomes = () => {
  return Cidade
    .find({}, { nome: 1 })
    .sort({ nome: 1 })
    .distinct("nome")
    .exec()
}

module.exports.list = () => {
  return Cidade
    .find({})
    .sort({ id: 1 })
    .select({ "id": 1, "nome": 1, "distrito": 1 })
    .exec()
}

module.exports.distritos = (distrito) => {
  return Cidade
    .find({ distrito: { $eq: distrito } })
    .sort({ id: 1 })
    .select({ "id": 1, "nome": 1 })
    .exec()
}


module.exports.lookUp = id => {
  return Cidade
    .findOne({ id: id })
    .exec()
}




