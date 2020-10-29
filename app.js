var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var cors = require("cors");
var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../todopage/build'))),

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../todopage/build', 'index.html')) // relative path
  })
}

app.use('/', indexRouter);
app.use('/todo', todoRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
