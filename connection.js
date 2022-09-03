const mysql = require('mariadb/callback')
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DBASE,
    multipleStatements: true
});

con.connect((err) => {
    if (!err) {
        console.log('DB connection success.');
    } else {
        console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = con;