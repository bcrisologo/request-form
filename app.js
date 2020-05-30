var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var monk = require('monk');						// Delete if not needed
mongoose.Promise = global.Promise;

// MongoDB Atlas for xerox-form => will try on a different version
// const url_atlas = 'mongodb+srv://yerin:T0rta_0530@bc-cloud-2-vvpqh.mongodb.net/test?retryWrites=true&w=majority';

// MongoDB for local with db name of requestform
const url_local = 'mongodb://localhost/requestform';

// Establishing connection using Mongoose =============================
mongoose.connect(url_local, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connection to MongoDB Atlas established'))
  .catch((error) => console.error(error));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forms = require('./routes/forms');		// For routing submitted forms

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// For using forms.js route
app.use('/forms', forms);						

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
