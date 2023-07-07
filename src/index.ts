import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeFirebaseApp } from './config/firebase-config';
import { resolvers } from './graphql/resolvers';
import { schema } from './graphql/schema';
import { decodeToken } from './middleware/auth-middleware';
const categories = require('./routes/categories');
const todo = require('./routes/todo');

// Middlewares
const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
// @ts-ignore: Will resolve it later
app.use(decodeToken);
app.use('/api/categories', categories);
app.use('/api/todo', todo);
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  app.use(morgan('tiny'));
}

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  await initializeFirebaseApp();
  app.listen(port, () => {
    console.log(`Expense-core listening at http://localhost:${port}`);
  });
};

startServer();
