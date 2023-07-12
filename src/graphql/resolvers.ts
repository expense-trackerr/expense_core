import db from '../db/database';

const testData = [
  {
    name: 'John Doe',
    age: 25,
  },
  {
    name: 'Doe',
    age: 46,
  },
];

// Root resolver
export const resolvers = {
  Query: {
    getCategories: async (_: any, { userId }: { userId: string }) => {
      console.log('userId:', userId);
      try {
        if (!userId) {
          throw new Error(
            'User ID is not present. Ensure that you are logged in to the application'
          );
        }
        const categories = await db.query(
          'SELECT name FROM categories WHERE user_uid = ?',
          [userId]
        );
        return categories[0];
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    getUser() {
      return testData;
    },
  },
};
