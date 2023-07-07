import { ApolloError } from 'apollo-server-express';
import { NextFunction, Response } from 'express';
import { admin, auth } from '../config/firebase-config';
import { UserAuthInfoRequest } from '../utils/express-types';

export async function decodeToken(
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
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
}

export const graphQlMiddleware = async ({
  req,
}: {
  req: UserAuthInfoRequest;
}) => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  try {
    const decodeValue = await auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodeValue.uid);
    if (!user) {
      throw new ApolloError('User is not authenticated', 'UNAUTHENTICATED');
    }
    return { user };
  } catch (error) {
    throw new ApolloError((error as Error).message, 'UNAUTHENTICATED');
  }
};
