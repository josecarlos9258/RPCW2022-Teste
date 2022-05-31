var express = require('express');
var router = express.Router();
var Cidade = require('../controllers/cidades')
var Ligacao = require('../controllers/ligações')



/* GET users listing. */
router.get('/cidades', function (req, res, next) {
  if (req.query.distrito) {
    Cidade.distritos(req.query.distrito)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
  }
  else {
    Cidade.list()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
  }
});

router.get('/cidades/nomes', function (req, res, next) {
  Cidade.nomes()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({ error: e }))
});

router.get('/cidades/:id', function (req, res, next) {
  Cidade.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({ error: e }))
});

router.get('/distritos', function (req, res, next) {
  Cidade.list()
    .then(dados => {
      var struct = {}
      dados.forEach(c => {
        var distrito = c.distrito
        if (distrito in struct) {
          struct[distrito].push({ id: c.id, nome: c.nome })
        }
        else {
          struct[distrito] = [{ id: c.id, nome: c.nome }]
        }
      });
      res.status(200).jsonp(struct)
    })
    .catch(e => res.status(505).jsonp({ error: e }))
});

router.get('/ligacoes', function (req, res, next) {
  if (req.query.origem) {
    Ligacao.origens(req.query.origem)
      .then(dados => {
        var a = []
        dados.forEach(or => {
          var struct = {}
          struct['id_destino'] = or.destino
          struct['id'] = or.id

          Cidade.lookUp(or.destino)
            .then(d => struct['nome_destino'] = d.nome)
            .catch(e => res.status(500).jsonp({ error: e }))
          a.push(struct)
        })
        res.status(200).jsonp(a)
      })
      .catch(e => res.status(500).jsonp({ error: e }))
  }

  else if (req.query.dist) {
    Ligacao.distancias(parseFloat(req.query.dist))
      .then(dados => {
        var a = []
        dados.forEach(or => {
          var struct = {}
          struct['id_destino'] = or.destino
          struct['id_origem'] = or.origem
          struct['id'] = or.id

          Cidade.lookUp(or.destino)
            .then(d => struct['nome_destino'] = d.nome)
            .catch(e => res.status(500).jsonp({ error: e }))

          Cidade.lookUp(or.origem)
            .then(d => struct['nome_origem'] = d.nome)
            .catch(e => res.status(500).jsonp({ error: e }))
          a.push(struct)
        })
        res.status(200).jsonp(a)
      })
      .catch(e => res.status(500).jsonp({ error: e }))
  }


});


module.exports = router;
