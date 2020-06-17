var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// MongoDB for local with db name of requestform =======================================
// const url = 'mongodb://localhost/requestform';
const url = 'mongodb+srv://yerin:T0rta_0530@bc-cloud-2-vvpqh.mongodb.net/xerox-form?retryWrites=true&w=majority';

// To remove deprecation warning for findByIdAndUpdate and ensureIndex =======================================
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Setup express-session =======================================
var expressSession = require('express-session')({
	secret: 'secret',		// Should change this value
	resave: false,
	saveUninitialized: false
});

// Establishing connection using Mongoose =======================================
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connection to MongoDB established'))
  .catch((error) => console.error(error));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forms = require('./routes/forms');		              // For routing submitted forms
var adminsettings = require('./routes/adminsettings');  // admin settings page

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession);			                 // expressSession enabled 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forms', forms);			                // For using forms.js route			
app.use('/adminsettings', adminsettings);     // admin settings page

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
