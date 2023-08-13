import mysql from 'mysql2';
import { PrismaClient } from '@prisma/client';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpassword',
  database: 'Expenses',
});

export default pool.promise();

export const prisma = new PrismaClient();
