import { Response } from 'express';
import { prisma } from '../config/database';
import { UserInfoRequest } from '../utils/express-types';

export const createUser = async (req: UserInfoRequest, res: Response) => {
  const userUid = req.userUid;
  const user = req.user;

  try {
    if (!userUid || !user?.email || !user?.name) {
      return res.status(400).json({
        message: 'User is not present. Ensure that you are logged in to the application',
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
        name: user.name,
        email: user.email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while finding or creating the user', message: (error as Error).message });
  }
};
