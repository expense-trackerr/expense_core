import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { UserInfoRequest } from '../utils/express-types';

const prisma = new PrismaClient();

export const createUser = async (req: UserInfoRequest, res: Response) => {
  const { userUid, name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        user_id: userUid,
        name,
        email,
      },
    });
    res.status(201).json('User created successfully', newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user', message: (error as Error).message });
  }
};
