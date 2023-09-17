import { CategoryTypeName } from '@prisma/client';
import express from 'express';
import { checkCategoryNameExists, createCategory } from '../controller/categories';
import { UserInfoRequest } from '../utils/express-types';

const router = express.Router();

type CreateCategoryReqBody = {
  categoryType: CategoryTypeName;
  categoryName: string;
  categoryBudget?: number;
  categoryColorId: string;
};

// Creates entries in the categories table
router.post('/create', async (req: UserInfoRequest, res) => {
  const { categoryName, categoryType, categoryBudget, categoryColorId }: CreateCategoryReqBody = req.body;
  const userUid = req.userUid;

  try {
    if (!userUid) {
      return res.status(400).json({
        message: 'User ID is not present. Ensure that you are logged in to the application',
      });
    }

    // Category name and type and color cannot be empty
    if (!categoryName || !categoryType || !categoryColorId) {
      return res.status(400).json({
        message: 'Category name, category type, and category color are required',
      });
    }

    // Cannot have duplicatate category names
    const categoryNameExists = await checkCategoryNameExists(userUid, categoryName);
    if (categoryNameExists) {
      return res.status(400).json({
        message: 'Category name already exists',
      });
    }

    // Create the category
    const createCategoryPayload = {
      categoryType,
      categoryName,
      categoryBudget,
      categoryColorId,
    };
    const createdCategoryId = await createCategory(userUid, createCategoryPayload);

    res.status(201).json({
      message: 'Category created successfully',
      data: createdCategoryId,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Error creating category', message: (error as Error).message });
  }
});

module.exports = router;
