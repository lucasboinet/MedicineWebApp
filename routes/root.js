var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'mysql-jabami.alwaysdata.net',
  user: 'jabami',
  password: 'medicine_dev6',
  database: 'jabami_medecine'
})

const { ensureAuthenticated, forwardAuthenticated, ensureAuthenticatedAndAdmin } = require('../config/auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', forwardAuthenticated, function(req, res, next){
  res.render('register');
});

router.post('/register', forwardAuthenticated, function(req, res, next){
  const { nom, prenom, email, password, password2 } = req.body;
  let errors = [];

  if (!nom || !prenom || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  global.duplicateEmail = false;

  connection.query("SELECT COUNT(*) AS nbEmail FROM users WHERE email = " +mysql.escape(email), function(err, rest){
    if (err) throw err;

    if(rest[0].nbEmail > 0){
      errors.push({ msg: "Email already registered" });
    }else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          connection.query("INSERT INTO users VALUES ('null','"+nom+"','"+prenom+"','"+email+"','"+hash +"',current_date,'free')", function(err, result){
            if (err) throw err;
            res.redirect('/login');
          })
        });
      });
    }
    if (errors.length > 0) {
      res.render('register', {
        errors,
        nom,
        prenom,
        email
      });
    }
  })
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
  res.render('dashboard', {u: {prenom: "lucas", nom: "boinet", plan: "free", subscribed_at: "2021-06-03"}, suivis: [{updated_at: "2021-06-03", nom: "hugo", prenom: "boinet", motif: "douleur au dos"}], patients: [{sexe: "H", nom: "boinet", prenom:"hugo", adresse: "13 rue anthoard"}]});
})

router.get('/api/suivi/income', ensureAuthenticatedAndAdmin, function(req, res, next) {
  connection.query("SELECT montant, updated_at FROM suivi WHERE year(date) IN ("+new Date().getFullYear()+","+(new Date().getFullYear()-1)+")", function(err, rows, fields){
    res.json(rows);
  })
})

router.get('/api/patient/gender', ensureAuthenticatedAndAdmin, function(req, res, next) {
  connection.query("SELECT sexe FROM patient WHERE id IN (SELECT patient_id FROM suivi WHERE user_id="+req.user.id+")", function(err, rows, fields) {
    res.json(rows);
  })
})

module.exports = router;
