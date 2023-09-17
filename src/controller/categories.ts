import { CategoryTypeName } from '@prisma/client';
import { prisma } from '../config/database';

type CategoryPayload = {
  categoryType: CategoryTypeName;
  categoryName: string;
  categoryBudget?: number;
  categoryColorId: string;
};

type CategoryDeletePayload = {
  categoryId: string;
  deleteTransactions: boolean;
};

// Checks if a category name exists for a user
export const checkCategoryNameExists = async (userId: string, categoryName: string) => {
  try {
    const res = await prisma.category.findFirst({
      where: {
        user_id: userId,
        name: categoryName,
        deleted: false,
      },
    });
    if (res === null) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking if category name exists:', error);
    throw new Error('Error checking if category name exists' + error);
  }
};

export const createCategory = async (userId: string, categoryPayload: CategoryPayload) => {
  const { categoryType, categoryName, categoryBudget, categoryColorId } = categoryPayload;

  try {
    // Get the category type ID
    const categoryTypeId = await prisma.categoryType.findFirst({
      where: {
        name: categoryType,
      },
    });
    if (!categoryTypeId) {
      throw new Error('Category type does not exist');
    }

    // Check if the category color id exists
    const categoryColorIdExists = await prisma.categoryColor.findFirst({
      where: {
        id: categoryColorId,
      },
    });
    if (!categoryColorIdExists) {
      throw new Error('Category color ID does not exist');
    }

    const res = await prisma.category.create({
      data: {
        user_id: userId,
        category_type_id: categoryTypeId.id,
        name: categoryName,
        budget: categoryType === CategoryTypeName.Expense ? categoryBudget : null,
        category_color_id: categoryColorId,
      },
    });
    return res.id;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Error creating category' + error);
  }
};

export const deleteCategory = async (userId: string, categoryDeletePayload: CategoryDeletePayload) => {
  const { categoryId, deleteTransactions } = categoryDeletePayload;

  try {
    // If deleteTransactions is true, delete all transactions associated with the category
    if (deleteTransactions) {
      await prisma.transaction.deleteMany({
        where: {
          category_id: categoryId,
          user_id: userId,
        },
      });

      // Then delete the category
      await prisma.category.delete({
        where: {
          id: categoryId,
          user_id: userId,
        },
      });
    }

    // If deleteTransactions is false, Set the deleted flag to true in Category table
    else {
      await prisma.category.update({
        where: {
          id: categoryId,
          user_id: userId,
        },
        data: {
          deleted: true,
        },
      });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Error deleting category' + error);
  }
};
