import { CategoryTypeName } from '@prisma/client';
import express from 'express';
import { checkCategoryNameExists, createCategory, deleteCategory, updateCategory } from '../controller/categories';
import { UserInfoRequest } from '../utils/express-types';

const router = express.Router();

type CreateCategoryReqBody = {
  categoryType: CategoryTypeName;
  categoryName: string;
  categoryBudget?: number;
  categoryColorId: string;
};

type UpdateCategoryReqBody = {
  categoryType: CategoryTypeName;
  categoryName?: string;
  categoryBudget?: number;
  categoryColorId?: string;
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

router.put('/update/:categoryId', async (req: UserInfoRequest, res) => {
  const userUid = req.userUid;
  const { categoryId } = req.params;
  const { categoryName, categoryBudget, categoryColorId, categoryType }: UpdateCategoryReqBody = req.body;

  try {
    if (!userUid) {
      return res.status(400).json({
        message: 'User ID is not present. Ensure that you are logged in to the application',
      });
    }
    if (!categoryId) {
      return res.status(400).json({
        message: 'Category ID is required',
      });
    }

    // Cannot have duplicatate category names
    if (categoryName) {
      const categoryNameExists = await checkCategoryNameExists(userUid, categoryName);
      if (categoryNameExists) {
        return res.status(400).json({
          message: 'Category name already exists',
        });
      }
    }

    // Update the category
    const updateCategoryPayload = {
      categoryId,
      categoryType,
      categoryName,
      categoryBudget,
      categoryColorId,
    };
    await updateCategory(userUid, updateCategoryPayload);

    res.status(200).json({
      message: 'Category updated successfully',
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Error updating category', message: (error as Error).message });
  }
});

// Delete categories
router.delete('/delete/:categoryId', async (req: UserInfoRequest, res) => {
  const userUid = req.userUid;
  const { categoryId } = req.params;
  const { deleteTransactions }: { deleteTransactions: boolean } = req.body;

  try {
    if (!userUid) {
      return res.status(400).json({
        message: 'User ID is not present. Ensure that you are logged in to the application',
      });
    }
    if (!categoryId) {
      return res.status(400).json({
        message: 'Category ID is required',
      });
    }

    const deleteCategoryPayload = {
      categoryId,
      deleteTransactions,
    };
    await deleteCategory(userUid, deleteCategoryPayload);

    res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Error deleting category', message: (error as Error).message });
  }
});

module.exports = router;
