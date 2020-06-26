const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'mysql-tkl.alwaysdata.net',
  user: 'tkl',
  password: 'tklstore589',
  database: 'tkl_medicine'
})
module.exports = function(passport) {
  connection.connect()
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      connection.query("SELECT * FROM users WHERE email='"+email+"'", function(err, rows, fields){
        if(rows.length == 0){
          return done(null, false, { message: 'That email is not registered' });
        }else {
          bcrypt.compare(password, rows[0].password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                  return done(null, rows[0]);
              } else {
                return done(null, false, { message: 'Password incorrect' });
              }
          })
        }
      })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id='"+id+"'", function(err, rows, fields) {
      done(err, rows[0]);
    })
  });
};
