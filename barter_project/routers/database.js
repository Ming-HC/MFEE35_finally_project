// 連線資料庫
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    multipleStatements: true
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("DataBase Connected!");
})

module.exports = conn;