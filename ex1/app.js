var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
//------------------------------------MongoDB--------------------------------------------------
/*Alterar para nome da base de dados*/
var BD = "MAPA2022"
mongoose.connect(`mongodb://127.0.0.1/${BD}`, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", (err) => {
  console.error.bind(console, "Erro de conexão ao MongoDB");
});
db.once("open", () => {
  console.log("Conexão ao Mongo realizada com sucesso");
});

//-------------------------------------------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
