var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const { connect } = require('./root');
var connection = mysql.createConnection({
  host: 'mysql-medicine.alwaysdata.net',
  user: 'medicine',
  password: 'Boinet1906!',
  database: 'medicine_app'
})

connection.connect()
/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM patient', function (err, rows, fields) {
    res.render('list', {patients: rows});
  });
});

router.get('/:id', function(req, res, next) {
  /*connection.query('SELECT * FROM products WHERE id='+req.params.id, function (err, rows, fields) {
    if (err) throw err
    res.render('users', {user: rows[0], title: 'User page: ' + req.params.id})
  });*/
  res.render('patient', {id: req.params.id})
});

module.exports = router;
