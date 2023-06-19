import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
export interface UserAuthInfoRequest extends Request {
  userUid?: string; // or any other type
  user?: DecodedIdToken;
}
