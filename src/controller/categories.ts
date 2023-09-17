import { CategoryTypeName } from '@prisma/client';
import { prisma } from '../config/database';

type CategoryPayload = {
  categoryType: CategoryTypeName;
  categoryName: string;
  categoryBudget?: number;
  categoryColorId: string;
};

// Checks if a category name exists for a user
export const checkCategoryNameExists = async (userId: string, categoryName: string) => {
  try {
    const res = await prisma.category.findFirst({
      where: {
        user_id: userId,
        name: categoryName,
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
