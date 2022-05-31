var modelo = require("../models/modelo");
var mongoose = require("mongoose");

module.exports.listar = function () {
  return modelo.find().exec();
};

module.exports.inserir = function (p) {
  //Inserir timestamp
  var d = new Date().toISOString().substring(0, 16);
  p.atr1 = d;

  var par = new modelo(p);
  return par.save();
};

module.exports.delete = function (id) {
  return modelo.findByIdAndDelete(id);
};

module.exports.edit = async function (id, data) {
  var elem = await modelo.findById(id).exec();
  elem.data = new Date().toISOString().substring(0, 16);
  elem.atr1 = data.atr1;
  return p.save();
};