var Ligacao = require("../models/ligacoes.js");
var mongoose = require("mongoose");

module.exports.origens = (cidade) => {
  return Ligacao
    .find({ origem: { $eq: cidade } })
    .sort({ id: 1 })
    .select({ "id": 1, "destino": 1 })
    .exec()
}

module.exports.distancias = (distancia) => {
  return Ligacao
    .find({ "distância": { $gte: distancia } })
    .sort({ id: 1 })
    .select({ "id": 1, "destino": 1, "origem": 1, "distância": 1 })
    .exec()
}



