import { auth } from '../config/firebase-config';
import { Response, NextFunction } from 'express';
import { UserAuthInfoRequest } from '../utils/express-types';

export async function decodeToken(
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
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
