var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

var indexRouter = require('./routes/root');
var patientRouter = require('./routes/patient');

var app = express();

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'm4y1_s4e2c4r4e6t0_p5h8r6a3s4e7',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 655555555 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error_s = req.flash('error');
  next();
});

app.use('/', indexRouter);
app.use('/patient', patientRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { code: 'Erreur ' + err.status});
});

module.exports = app;
