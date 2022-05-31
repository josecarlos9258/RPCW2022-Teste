var express = require('express');
var router = express.Router();
var axios = require('axios');


// API Token:
var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNzY2MCwiZXhwIjoxNjU0MDQ2NDYwfQ.UiMO_0hu9iggj2d7iHx6D-X2-KjP89lRbXjiAKqlfIpn4C1YPXsqTEsMGpJx4DrYiCyuP46ZjedkvKR6wUmqnrokETCIcQ2PN7-RdzH5wniGK1XKzrkmSQfjUrY7lI_Z126Kl3beuIq-_Eq2PTSR61y4b7VA7fN7-6WM1LU7xM5wpN0dX8jhMpvcocKhV3bvR02_yQiM-s_f6QyEy0lxoL6O1krvJXZo09AZSbXHLJiWNUaaRtpJx3CLMBQv4LnFJxpNaUBbTfXgadmdoaUcvIU1FHrNgZAntiQ20sJHKbm6AZw2rW88vNjaekjOKAILTCAUJKUzkBeUjydqqjQunw"


// Página Inicial:
router.get('/classes', function (req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => {
      var classes = dados.data;
    })
    .catch((err) => {
      res.render("error", { error: err });
    })
});


// Transformação dos códigos de classes em links:
router.get('/termos', function (req, res) {
  console.log(req.params.id)
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice/' + '?token=' + token)
    .then(dados => {

      res.render('termos', { termos: dados.data })
    })
    .catch((err) => {
      res.render("error", { error: err });
    })
});

module.exports = router;
