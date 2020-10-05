const mysql = require('mysql');

module.exports.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1911669199",
    database: "enjoy_reading"
})




