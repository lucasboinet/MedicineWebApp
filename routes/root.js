var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'mysql-medicine.alwaysdata.net',
  user: 'medicine',
  password: 'Boinet1906!',
  database: 'medicine_app'
})

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', forwardAuthenticated, function(req, res, next){
  res.render('register');
});

router.post('/register', forwardAuthenticated, function(req, res, next){
  connection.connect()
  const { nom, prenom, email, password, password2 } = req.body;
  let errors = [];

  if (!nom || !prenom || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      nom,
      prenom,
      email,
      password,
      password2
    });
  }else {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          var hashedPassword = hash;
          connection.query("INSERT INTO users VALUES ('null','"+nom+"','"+prenom+"','"+email+"','"+hashedPassword+"',current_date,'free')", function(err, result){
            if (err) throw err;
            res.redirect('/login');
          })
        });
    });
  }
})

router.get('/login', forwardAuthenticated, function(req, res, next) {
  res.render('login');
});

router.post('/login', forwardAuthenticated, function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
})

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', ensureAuthenticated, function(req, res, next){
  connection.query("SELECT motif, updated_at, patient_id FROM suivi WHERE user_id='"+req.user.id+"'", function(err, rows, fields){
    res.render('dashboard', {u: req.user, suivis: rows});
  })
})

module.exports = router;