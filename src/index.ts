import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeFirebaseApp } from './config/firebase-config';
import { decodeToken } from './middleware/auth-middleware';
import morgan from 'morgan';
const categories = require('./routes/categories');
const todo = require('./routes/todo');

const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
// @ts-ignore: Will resolve it later
app.use(decodeToken);
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  app.use(morgan('tiny'));
}

app.use('/api/categories', categories);
app.use('/api/todo', todo);

const startServer = async () => {
  await initializeFirebaseApp();
  app.listen(port, () => {
    console.log(`Expense-core listening at http://localhost:${port}`);
  });
};

startServer();
