import { PrismaClient } from '@prisma/client';

// const pool = mysql.createPool({
//   host: 'expense-tracker.cj6jqm9d7pyp.us-east-2.rds.amazonaws.com',
//   user: 'root',
//   password: 'mysqlpassword',
//   database: 'expense-tracker',
// });

// export default pool.promise();

export const prisma = new PrismaClient();
