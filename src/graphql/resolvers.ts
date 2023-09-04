import { prisma } from '../config/database';
import { QueryGetCategoriesArgs, Resolvers } from './generatedGraphqlTypes';

export const resolvers: Resolvers = {
  Query: {
    getCategories: async (_: any, args: QueryGetCategoriesArgs) => {
      const userId = args.userId;
      const categories = await prisma.category.findMany({
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return categories;
    },
  },
};
