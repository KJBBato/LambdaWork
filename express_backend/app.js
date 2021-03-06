var express = require('express');
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var questionApi = require('./routes/questionApi');
var userApi = require('./routes/userApi');
var quizApi = require('./routes/quizApi');
var attemptApi = require('./routes/attemptApi');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
	  	user     : 'challenger',
	  	password : 'onewsheyelai',
	  	database : 'challengerDb1',
	  	port: '3306'
	});
	next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/questionApi', questionApi);
app.use('/userApi', userApi);
app.use('/quizApi', quizApi);
app.use('/attemptApi', attemptApi);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
