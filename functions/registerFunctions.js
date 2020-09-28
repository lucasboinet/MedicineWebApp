var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'mysql-medicine.alwaysdata.net',
  user: 'medicine',
  password: 'Boinet1906!',
  database: 'medicine_app'
})

function emailAlreadyTaken(newEmail){
    var exist = false;
    console.log("in start func");
    connection.query("SELECT COUNT(*) AS nbEmail FROM users WHERE email = ?", newEmail, function(err, res){
        if(err){
            throw err;
        }else {
            console.log(res[0].nbEmail);
            if (res[0].nbEmail > 0) {
                exist = true;
            }
        }
    })
    console.log("in end func");
    return exist;
}

module.exports = {emailAlreadyTaken}
