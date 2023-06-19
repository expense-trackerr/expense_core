import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeFirebaseApp } from './config/firebase-config';
import { decodeToken } from './middleware/auth-middleware';
const categories = require('./routes/categories');
const todo = require('./routes/todo');
const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(decodeToken);
app.use('/api/categories', categories);
app.use('/api/todo', todo);

const startServer = async () => {
  await initializeFirebaseApp();
  app.listen(port, () => {
    console.log(`Expense-core listening at http://localhost:${port}`);
  });
};

startServer();
