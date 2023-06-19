import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpassword',
  database: 'Expenses',
});

export default pool.promise();
