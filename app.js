var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer = require('multer');

var routes = require('./routes/index');
var settings = require('./settings');


var mongoose = require('mongoose');
mongoose.connect(settings.dbUrl);
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});


var app = express();

app.set('port', process.env.PORT ||3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//add log
app.use(logger('combined', {stream: accessLog}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//error log
app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

//session
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000*60*60},//1hour
  store: new MongoStore({
    //db: settings.db,
    //host: settings.host,
    //port: settings.port
    url: settings.dbUrl
  }),
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use(multer({
  dest: "./public/upload",
  limits: {
    filesize: 1024*1024*5
  },
  fileFilter: function(req, file, cb){
    if(file.mimetype.slice(0, 5) == "image") cb(null, true);
    else cb(new Error('please upload img and limited 5M'), false);
  },
  rename: function(fieldname, filename){
    console.log(filename);
    return filename.replace(/\w+/g, '-').toLowerCase()+Date.now();
  }
}));

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port:' + app.get('port'));
});

module.exports = app;

