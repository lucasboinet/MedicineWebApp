var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const { connect } = require('.');
var connection = mysql.createConnection({
  host: 'mysql-tkl.alwaysdata.net',
  user: 'tkl',
  password: 'tklstore589',
  database: 'tkl_medicine'
})

connection.connect()
/* GET users listing. */
router.get('/', function(req, res, next) {
  /*connection.query('SELECT * FROM products', function (err, rows, fields) {
    if (err) throw err
  });*/
  res.render('list')
});

router.get('/:id', function(req, res, next) {
  /*connection.query('SELECT * FROM products WHERE id='+req.params.id, function (err, rows, fields) {
    if (err) throw err
    res.render('users', {user: rows[0], title: 'User page: ' + req.params.id})
  });*/
  res.render('patient', {id: req.params.id})
});

module.exports = router;
