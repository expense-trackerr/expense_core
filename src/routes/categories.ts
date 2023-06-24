import express from 'express';
import { UserInfoRequest } from '../utils/express-types';
import db from '../db/database';

const router = express.Router();

//DB
// Gets entries from the categories table based on the user id
router.get('/', async (req: UserInfoRequest, res) => {
  const userUid = req.userUid;
  try {
    if (!userUid) {
      return res.status(400).json({
        message:
          'User ID is not present. Ensure that you are logged in to the application',
      });
    }
    const categories = await db.query(
      'SELECT name FROM categories WHERE user_uid = ?',
      [userUid]
    );
    res.status(200).json(categories[0]);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//DB
// Creates entries in the categories table
router.post('/create', async (req: UserInfoRequest, res) => {
  const { categories }: { categories: string[] } = req.body;
  const userUid = req.userUid;
  try {
    if (!userUid) {
      return res.status(400).json({
        message:
          'User ID is not present. Ensure that you are logged in to the application',
      });
    }
    // Categories cannot be empty
    if (
      !categories ||
      categories.length === 0 ||
      categories.some((category) => !category.trim())
    ) {
      return res.status(400).json({ message: 'Categories cannot be empty' });
    }

    // Unique categories validation
    const duplicateCategories = await Promise.all(
      categories.map((category) => {
        return db.query(
          'SELECT name FROM categories WHERE name = ? AND user_uid = ?',
          [category, userUid]
        );
      })
    );

    const duplicateCategoryNames = duplicateCategories
      .map((result) => result[0][0]?.name)
      .filter((name) => name !== undefined);

    if (duplicateCategoryNames.length > 0) {
      return res.status(400).json({
        message: `${duplicateCategoryNames[0]} already exists`,
      });
    }

    const insertPromises = categories.map((category) => {
      return db.query('INSERT INTO categories (name, user_uid) VALUES (?, ?)', [
        category,
        userUid,
      ]);
    });
    await Promise.all(insertPromises);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// DB
// Deletes entries in the categories table
router.post('/delete', async (req: UserInfoRequest, res) => {
  const { categories }: { categories: string | string[] } = req.body;
  const userUid = req.userUid;
  try {
    if (typeof categories === 'string') {
      await db.query('DELETE FROM categories WHERE name = ? AND user_uid = ?', [
        categories,
        userUid,
      ]);
    } else {
      const deletePromises = categories.map((category) => {
        return db.query(
          'DELETE FROM categories WHERE name = ? AND user_uid = ?',
          [category, userUid]
        );
      });
      await Promise.all(deletePromises);
    }
    res.status(201).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

module.exports = router;
