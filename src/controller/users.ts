import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { UserInfoRequest } from '../utils/express-types';

const prisma = new PrismaClient();

export const createUser = async (req: UserInfoRequest, res: Response) => {
  const { userUid, name, email } = req.body;

  try {
    if (!userUid) {
      return res.status(400).json({
        message: 'User ID is not present. Ensure that you are logged in to the application',
      });
    }
    // check if user is already present in the database, then do nothing
    const userAlreadyPresent = await prisma.user.findUnique({
      where: {
        id: userUid,
      },
    });
    if (userAlreadyPresent) {
      return res.status(200).json(userAlreadyPresent);
    }

    const newUser = await prisma.user.create({
      data: {
        id: userUid,
        name,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while finding or creating the user', message: (error as Error).message });
  }
};
