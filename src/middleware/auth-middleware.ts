import { NextFunction, Response } from 'express';
import { GraphQLError } from 'graphql';
import { IncomingMessage } from 'http';
import { admin, auth } from '../config/firebase-config';
import { UserAuthInfoRequest } from '../utils/express-types';

export const restMiddleware = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  // Skip authentication check for GraphQL requests
  if (req.path === '/graphql') {
    return next();
  }
  if (!req.headers.authorization) {
    return res.status(401).send('Authorization header is missing.');
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodeValue = await auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      req.userUid = decodeValue.uid;
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  } catch (error) {
    return res.json({ message: (error as Error).message });
  }
};

export const graphQlMiddleware = async ({ req }: { req: IncomingMessage }) => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  try {
    const decodeValue = await auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodeValue.uid);
    if (!user) {
      throw new GraphQLError('User is not authenticated');
    }
    return { user };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
