const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysqlpassword",
  database: "Expenses",
});

module.exports = pool.promise();
